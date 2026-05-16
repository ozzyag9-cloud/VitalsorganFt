// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title IdentityRegistry
 * @notice Registry for privacy-preserving human identity commitments and DID mappings.
 * @dev Stores only wallet-level status, DID strings, and hashed identity commitments. Raw biometrics,
 * documents, and personally identifying information must remain encrypted and off-chain. The contract
 * is intentionally dependency-light so it can later be migrated behind a proxy or replaced by a ZK
 * verifier-backed registry while preserving event semantics.
 */
contract IdentityRegistry is AccessControl {
    /// @notice Role allowed to register identities and update verification status.
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");

    /// @notice Role reserved for protocol operations such as guardian policy changes in future versions.
    bytes32 public constant PROTOCOL_ADMIN_ROLE = keccak256("PROTOCOL_ADMIN_ROLE");

    /// @notice Human identity record stored by the registry.
    struct IdentityRecord {
        bytes32 identityCommitment;
        string did;
        bool registered;
        bool verified;
        uint64 registeredAt;
        uint64 updatedAt;
    }

    /// @notice Wallet address to identity record.
    mapping(address human => IdentityRecord record) private identities;

    /// @notice Identity commitment to wallet address to enforce one active wallet per commitment.
    mapping(bytes32 identityCommitment => address human) public commitmentOwner;

    /// @notice Future recovery guardian allowlist. This release only records guardian intent.
    mapping(address human => mapping(address guardian => bool enabled)) public recoveryGuardians;

    event HumanRegistered(address indexed human, bytes32 indexed identityCommitment, string did, address indexed validator);
    event VerificationStatusUpdated(address indexed human, bool verified, address indexed validator);
    event DIDUpdated(address indexed human, string previousDid, string newDid, address indexed validator);
    event RecoveryGuardianUpdated(address indexed human, address indexed guardian, bool enabled);

    error AlreadyRegistered(address human);
    error CommitmentAlreadyRegistered(bytes32 identityCommitment, address owner);
    error EmptyDID();
    error EmptyCommitment();
    error IdentityNotRegistered(address human);
    error InvalidGuardian(address guardian);

    /**
     * @notice Creates the registry and grants least-privilege roles to the bootstrap admin.
     * @param initialAdmin Address that receives DEFAULT_ADMIN_ROLE, PROTOCOL_ADMIN_ROLE, and VALIDATOR_ROLE.
     */
    constructor(address initialAdmin) {
        require(initialAdmin != address(0), "IdentityRegistry: zero admin");
        _grantRole(DEFAULT_ADMIN_ROLE, initialAdmin);
        _grantRole(PROTOCOL_ADMIN_ROLE, initialAdmin);
        _grantRole(VALIDATOR_ROLE, initialAdmin);
    }

    /**
     * @notice Registers a human wallet with a privacy-preserving identity commitment and DID.
     * @param human Wallet controlled by the verified human.
     * @param identityCommitment Hash or ZK commitment representing off-chain identity evidence.
     * @param did Decentralized identifier controlled by the human.
     */
    function registerHuman(address human, bytes32 identityCommitment, string calldata did) external onlyRole(VALIDATOR_ROLE) {
        if (identities[human].registered) revert AlreadyRegistered(human);
        if (identityCommitment == bytes32(0)) revert EmptyCommitment();
        if (bytes(did).length == 0) revert EmptyDID();

        address existingOwner = commitmentOwner[identityCommitment];
        if (existingOwner != address(0)) revert CommitmentAlreadyRegistered(identityCommitment, existingOwner);

        uint64 timestamp = uint64(block.timestamp);
        identities[human] = IdentityRecord({
            identityCommitment: identityCommitment,
            did: did,
            registered: true,
            verified: true,
            registeredAt: timestamp,
            updatedAt: timestamp
        });
        commitmentOwner[identityCommitment] = human;

        emit HumanRegistered(human, identityCommitment, did, msg.sender);
        emit VerificationStatusUpdated(human, true, msg.sender);
    }

    /**
     * @notice Updates an existing human's DID after off-chain ownership checks.
     * @param human Registered wallet.
     * @param newDid Replacement decentralized identifier.
     */
    function updateDID(address human, string calldata newDid) external onlyRole(VALIDATOR_ROLE) {
        IdentityRecord storage record = identities[human];
        if (!record.registered) revert IdentityNotRegistered(human);
        if (bytes(newDid).length == 0) revert EmptyDID();

        string memory previousDid = record.did;
        record.did = newDid;
        record.updatedAt = uint64(block.timestamp);

        emit DIDUpdated(human, previousDid, newDid, msg.sender);
    }

    /**
     * @notice Enables or disables verification without deleting historical registration data.
     * @param human Registered wallet.
     * @param verified New verification status.
     */
    function setVerificationStatus(address human, bool verified) external onlyRole(VALIDATOR_ROLE) {
        IdentityRecord storage record = identities[human];
        if (!record.registered) revert IdentityNotRegistered(human);

        record.verified = verified;
        record.updatedAt = uint64(block.timestamp);

        emit VerificationStatusUpdated(human, verified, msg.sender);
    }

    /**
     * @notice Records a future recovery guardian preference for a registered human.
     * @param guardian Guardian address that may participate in future account recovery flows.
     * @param enabled Whether the guardian is enabled.
     */
    function setRecoveryGuardian(address guardian, bool enabled) external {
        if (!identities[msg.sender].registered) revert IdentityNotRegistered(msg.sender);
        if (guardian == address(0) || guardian == msg.sender) revert InvalidGuardian(guardian);

        recoveryGuardians[msg.sender][guardian] = enabled;
        emit RecoveryGuardianUpdated(msg.sender, guardian, enabled);
    }

    /**
     * @notice Returns whether a wallet currently has verified-human status.
     * @param human Wallet to inspect.
     */
    function isVerified(address human) external view returns (bool) {
        return identities[human].registered && identities[human].verified;
    }

    /**
     * @notice Returns the full identity record for audit-friendly integrations.
     * @param human Wallet to inspect.
     */
    function getIdentity(address human) external view returns (IdentityRecord memory) {
        return identities[human];
    }
}
