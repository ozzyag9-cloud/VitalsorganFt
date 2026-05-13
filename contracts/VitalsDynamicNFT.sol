// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VitalsDynamicNFT
 * @notice A standalone ERC-721 compatible living certificate for biometric dNFTs.
 * @dev The contract stores only hashed biometric commitments and holder metadata hashes.
 *      Raw biometric samples and personally identifiable holder details must never be
 *      written to a public chain. Wallet ownership is represented by the token owner.
 */
contract VitalsDynamicNFT {
    enum OrganType { Heart, Brain, Lungs, Gut, Skin }
    enum LifeState { Embryonic, Vital, Resilient, Thriving, Ascendant, Immortal, Stressed, Critical }

    struct LivingCertificate {
        OrganType organType;
        LifeState lifeState;
        uint8 healthScore;
        uint16 streakDays;
        uint16 neuralLinkStrength;
        uint32 mintedAt;
        uint32 lastEvolvedAt;
        uint8 earnedTraits;
        bytes32 biometricCommitment;
        bytes32 holderProfileHash;
        string certificateId;
        string encryptedMetadataURI;
    }

    string public name = "Vitals Living Biometric Certificate";
    string public symbol = "VITALDNFT";
    string public contractURI;
    address public owner;
    address public oracle;
    uint256 public mintPrice = 0.05 ether;
    uint256 public totalSupply;

    mapping(uint256 => LivingCertificate) public certificates;
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed tokenOwner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed tokenOwner, address indexed operator, bool approved);
    event CertificateMinted(
        uint256 indexed tokenId,
        address indexed holder,
        string certificateId,
        bytes32 biometricCommitment,
        bytes32 holderProfileHash
    );
    event BiometricsEvolved(
        uint256 indexed tokenId,
        uint8 healthScore,
        uint16 streakDays,
        LifeState lifeState,
        uint8 earnedTraits,
        bytes32 newBiometricCommitment
    );
    event OracleUpdated(address indexed oracle);
    event ContractURIUpdated(string uri);

    modifier onlyOwner() {
        require(msg.sender == owner, "ONLY_OWNER");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle || msg.sender == owner, "ONLY_ORACLE");
        _;
    }

    constructor(address initialOracle, string memory initialContractURI) {
        owner = msg.sender;
        oracle = initialOracle == address(0) ? msg.sender : initialOracle;
        contractURI = initialContractURI;
    }

    function mintLivingCertificate(
        OrganType organType,
        bytes32 biometricCommitment,
        bytes32 holderProfileHash,
        string calldata certificateId,
        string calldata encryptedMetadataURI
    ) external payable returns (uint256 tokenId) {
        require(msg.value >= mintPrice, "INSUFFICIENT_PAYMENT");
        require(biometricCommitment != bytes32(0), "BIOMETRIC_COMMITMENT_REQUIRED");
        require(holderProfileHash != bytes32(0), "HOLDER_HASH_REQUIRED");
        require(bytes(certificateId).length > 0, "CERTIFICATE_ID_REQUIRED");

        tokenId = ++totalSupply;
        _owners[tokenId] = msg.sender;
        _balances[msg.sender] += 1;

        certificates[tokenId] = LivingCertificate({
            organType: organType,
            lifeState: LifeState.Embryonic,
            healthScore: 60,
            streakDays: 0,
            neuralLinkStrength: 50,
            mintedAt: uint32(block.timestamp),
            lastEvolvedAt: uint32(block.timestamp),
            earnedTraits: 0,
            biometricCommitment: biometricCommitment,
            holderProfileHash: holderProfileHash,
            certificateId: certificateId,
            encryptedMetadataURI: encryptedMetadataURI
        });

        emit Transfer(address(0), msg.sender, tokenId);
        emit CertificateMinted(tokenId, msg.sender, certificateId, biometricCommitment, holderProfileHash);
    }

    function evolveBiometrics(
        uint256 tokenId,
        uint8 healthScore,
        uint16 streakDays,
        uint16 neuralLinkStrength,
        bytes32 newBiometricCommitment,
        string calldata encryptedMetadataURI
    ) external onlyOracle {
        require(_exists(tokenId), "TOKEN_NOT_FOUND");
        require(healthScore <= 100, "INVALID_HEALTH_SCORE");
        require(neuralLinkStrength <= 100, "INVALID_LINK_STRENGTH");
        require(newBiometricCommitment != bytes32(0), "BIOMETRIC_COMMITMENT_REQUIRED");

        LivingCertificate storage certificate = certificates[tokenId];
        certificate.healthScore = healthScore;
        certificate.streakDays = streakDays;
        certificate.neuralLinkStrength = neuralLinkStrength;
        certificate.biometricCommitment = newBiometricCommitment;
        certificate.encryptedMetadataURI = encryptedMetadataURI;
        certificate.lastEvolvedAt = uint32(block.timestamp);
        certificate.lifeState = _deriveLifeState(healthScore, streakDays);
        certificate.earnedTraits = _deriveTraits(healthScore, streakDays, certificate.earnedTraits);

        emit BiometricsEvolved(
            tokenId,
            healthScore,
            streakDays,
            certificate.lifeState,
            certificate.earnedTraits,
            newBiometricCommitment
        );
    }

    function setOracle(address newOracle) external onlyOwner {
        require(newOracle != address(0), "ORACLE_REQUIRED");
        oracle = newOracle;
        emit OracleUpdated(newOracle);
    }

    function setContractURI(string calldata uri) external onlyOwner {
        contractURI = uri;
        emit ContractURIUpdated(uri);
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    function withdraw(address payable recipient) external onlyOwner {
        require(recipient != address(0), "RECIPIENT_REQUIRED");
        recipient.transfer(address(this).balance);
    }

    function balanceOf(address holder) external view returns (uint256) {
        require(holder != address(0), "ZERO_ADDRESS");
        return _balances[holder];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner != address(0), "TOKEN_NOT_FOUND");
        return tokenOwner;
    }

    function approve(address to, uint256 tokenId) external {
        address tokenOwner = ownerOf(tokenId);
        require(msg.sender == tokenOwner || isApprovedForAll(tokenOwner, msg.sender), "NOT_AUTHORIZED");
        _tokenApprovals[tokenId] = to;
        emit Approval(tokenOwner, to, tokenId);
    }

    function getApproved(uint256 tokenId) external view returns (address) {
        require(_exists(tokenId), "TOKEN_NOT_FOUND");
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) external {
        require(operator != msg.sender, "SELF_APPROVAL");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address tokenOwner, address operator) public view returns (bool) {
        return _operatorApprovals[tokenOwner][operator];
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "NOT_AUTHORIZED");
        require(ownerOf(tokenId) == from, "WRONG_FROM");
        require(to != address(0), "ZERO_ADDRESS");

        delete _tokenApprovals[tokenId];
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) external {
        transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata) external {
        transferFrom(from, to, tokenId);
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "TOKEN_NOT_FOUND");
        LivingCertificate memory certificate = certificates[tokenId];

        return string.concat(
            "data:application/json;utf8,",
            "{\"name\":\"Vitals Living Certificate #", _toString(tokenId),
            "\",\"description\":\"A self-evolving biometric dynamic NFT certificate. Public metadata contains only cryptographic commitments, not raw biometrics.\",",
            "\"external_url\":\"", certificate.encryptedMetadataURI,
            "\",\"attributes\":[",
            _attribute("Certificate ID", certificate.certificateId), ",",
            _attribute("Organ", _organName(certificate.organType)), ",",
            _attribute("Life State", _stateName(certificate.lifeState)), ",",
            _numericAttribute("Health Score", certificate.healthScore), ",",
            _numericAttribute("Streak Days", certificate.streakDays), ",",
            _numericAttribute("Neural Link", certificate.neuralLinkStrength), ",",
            _numericAttribute("Earned Traits Bitmask", certificate.earnedTraits),
            "],\"biometric_commitment\":\"", _toHex(certificate.biometricCommitment),
            "\",\"holder_profile_hash\":\"", _toHex(certificate.holderProfileHash),
            "\"}"
        );
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == 0x80ac58cd || interfaceId == 0x5b5e139f || interfaceId == 0x01ffc9a7;
    }

    function _deriveLifeState(uint8 score, uint16 streakDays) internal pure returns (LifeState) {
        if (score < 20) return LifeState.Critical;
        if (score < 50) return LifeState.Stressed;
        if (score >= 90 && streakDays >= 180) return LifeState.Immortal;
        if (score >= 90 && streakDays >= 90) return LifeState.Ascendant;
        if (score >= 80 && streakDays >= 60) return LifeState.Thriving;
        if (score >= 75 && streakDays >= 30) return LifeState.Resilient;
        if (score >= 70 && streakDays >= 7) return LifeState.Vital;
        return LifeState.Embryonic;
    }

    function _deriveTraits(uint8 score, uint16 streakDays, uint8 existingTraits) internal pure returns (uint8 traits) {
        traits = existingTraits;
        if (score >= 70 && streakDays >= 7) traits |= uint8(1 << 0);
        if (score >= 75 && streakDays >= 30) traits |= uint8(1 << 1);
        if (score >= 80 && streakDays >= 60) traits |= uint8(1 << 2);
        if (score >= 90 && streakDays >= 90) traits |= uint8(1 << 3);
        if (score >= 90 && streakDays >= 180) traits |= uint8(1 << 4);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _owners[tokenId] != address(0);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address tokenOwner = ownerOf(tokenId);
        return spender == tokenOwner || _tokenApprovals[tokenId] == spender || isApprovedForAll(tokenOwner, spender);
    }

    function _attribute(string memory traitType, string memory value) internal pure returns (string memory) {
        return string.concat("{\"trait_type\":\"", traitType, "\",\"value\":\"", value, "\"}");
    }

    function _numericAttribute(string memory traitType, uint256 value) internal pure returns (string memory) {
        return string.concat("{\"trait_type\":\"", traitType, "\",\"value\":", _toString(value), "}");
    }

    function _organName(OrganType organType) internal pure returns (string memory) {
        if (organType == OrganType.Heart) return "Heart";
        if (organType == OrganType.Brain) return "Brain";
        if (organType == OrganType.Lungs) return "Lungs";
        if (organType == OrganType.Gut) return "Gut";
        return "Skin";
    }

    function _stateName(LifeState lifeState) internal pure returns (string memory) {
        if (lifeState == LifeState.Embryonic) return "Embryonic";
        if (lifeState == LifeState.Vital) return "Vital";
        if (lifeState == LifeState.Resilient) return "Resilient";
        if (lifeState == LifeState.Thriving) return "Thriving";
        if (lifeState == LifeState.Ascendant) return "Ascendant";
        if (lifeState == LifeState.Immortal) return "Immortal";
        if (lifeState == LifeState.Stressed) return "Stressed";
        return "Critical";
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function _toHex(bytes32 data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(66);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 32; i++) {
            uint8 value = uint8(data[i]);
            str[2 + i * 2] = alphabet[value / 16];
            str[3 + i * 2] = alphabet[value % 16];
        }
        return string(str);
    }
}
