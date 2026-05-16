// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface IIdentityRegistry {
    function isVerified(address human) external view returns (bool);
}

/**
 * @title SoulboundIdentity
 * @notice Non-transferable ERC-721 credential minted once per verified human.
 * @dev Tokens are soulbound by overriding ERC-721 update semantics and rejecting wallet-to-wallet
 * transfers. Mint and burn remain possible for authorized lifecycle operations.
 */
contract SoulboundIdentity is ERC721URIStorage, AccessControl {
    /// @notice Role allowed to mint identity credentials.
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @notice Role allowed to burn compromised or revoked credentials.
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    /// @notice Registry used to validate human verification status before minting.
    IIdentityRegistry public immutable identityRegistry;

    uint256 private nextTokenId = 1;
    mapping(address human => uint256 tokenId) public tokenOf;

    event SoulboundIdentityMinted(address indexed human, uint256 indexed tokenId, string tokenUri);
    event SoulboundIdentityBurned(address indexed human, uint256 indexed tokenId, address indexed operator);

    error HumanNotVerified(address human);
    error IdentityAlreadyMinted(address human, uint256 tokenId);
    error SoulboundTransferBlocked();
    error TokenDoesNotExist(uint256 tokenId);

    /**
     * @notice Creates the soulbound credential contract.
     * @param registry Address of the IdentityRegistry-compatible verifier.
     * @param initialAdmin Bootstrap admin that can grant mint and burn roles.
     */
    constructor(address registry, address initialAdmin) ERC721("Proof of Life Soulbound Identity", "POL-ID") {
        require(registry != address(0), "SoulboundIdentity: zero registry");
        require(initialAdmin != address(0), "SoulboundIdentity: zero admin");
        identityRegistry = IIdentityRegistry(registry);
        _grantRole(DEFAULT_ADMIN_ROLE, initialAdmin);
        _grantRole(MINTER_ROLE, initialAdmin);
        _grantRole(BURNER_ROLE, initialAdmin);
    }

    /**
     * @notice Mints a non-transferable identity NFT to a verified human.
     * @param human Verified wallet receiving the credential.
     * @param tokenUri Metadata URI containing non-sensitive public credential metadata.
     */
    function mint(address human, string calldata tokenUri) external onlyRole(MINTER_ROLE) returns (uint256 tokenId) {
        if (!identityRegistry.isVerified(human)) revert HumanNotVerified(human);
        if (tokenOf[human] != 0) revert IdentityAlreadyMinted(human, tokenOf[human]);

        tokenId = nextTokenId++;
        tokenOf[human] = tokenId;
        _safeMint(human, tokenId);
        _setTokenURI(tokenId, tokenUri);

        emit SoulboundIdentityMinted(human, tokenId, tokenUri);
    }

    /**
     * @notice Burns a token for revocation, key loss, or migration workflows.
     * @param tokenId Token to burn.
     */
    function burn(uint256 tokenId) external onlyRole(BURNER_ROLE) {
        address human = _ownerOf(tokenId);
        if (human == address(0)) revert TokenDoesNotExist(tokenId);

        delete tokenOf[human];
        _burn(tokenId);

        emit SoulboundIdentityBurned(human, tokenId, msg.sender);
    }

    /** @inheritdoc ERC721 */
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721) returns (address from) {
        from = super._update(to, tokenId, auth);
        if (from != address(0) && to != address(0)) revert SoulboundTransferBlocked();
    }

    /** @inheritdoc ERC721URIStorage */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /** @inheritdoc ERC721URIStorage */
    function supportsInterface(bytes4 interfaceId) public view override(ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
