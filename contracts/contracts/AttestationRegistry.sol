// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title AttestationRegistry
 * @notice Stores typed attestations issued by trusted organizations without exposing sensitive source data.
 * @dev Attestations contain only proof hashes and optional metadata URIs. Healthcare, education, and aid
 * providers should encrypt payloads off-chain and publish only hashes or privacy-preserving commitments here.
 */
contract AttestationRegistry is AccessControl {
    /// @notice Role allowed to grant and revoke trusted issuer permissions.
    bytes32 public constant ISSUER_ADMIN_ROLE = keccak256("ISSUER_ADMIN_ROLE");

    /// @notice Role assigned to external trusted issuers.
    bytes32 public constant TRUSTED_ISSUER_ROLE = keccak256("TRUSTED_ISSUER_ROLE");

    /// @notice Supported attestation categories. Additional categories can be added in future migrations.
    enum AttestationType {
        Identity,
        Liveness,
        Healthcare,
        Education,
        HumanitarianAid,
        DAOEligibility,
        Custom
    }

    /// @notice Public attestation envelope with private evidence represented by a proof hash.
    struct Attestation {
        bytes32 proofHash;
        address issuer;
        uint64 timestamp;
        AttestationType attestationType;
        bool revoked;
        string metadataURI;
    }

    uint256 private nextAttestationId = 1;
    mapping(uint256 id => Attestation attestation) private attestations;
    mapping(address subject => uint256[] ids) private attestationsBySubject;

    event AttestationIssued(
        uint256 indexed attestationId,
        address indexed subject,
        address indexed issuer,
        AttestationType attestationType,
        bytes32 proofHash,
        string metadataURI
    );
    event AttestationRevoked(uint256 indexed attestationId, address indexed issuer);
    event TrustedIssuerUpdated(address indexed issuer, bool trusted, address indexed admin);

    error EmptyProofHash();
    error AttestationNotFound(uint256 attestationId);
    error NotOriginalIssuer(address caller, address issuer);

    /**
     * @notice Creates the attestation registry.
     * @param initialAdmin Bootstrap admin and initial trusted issuer.
     */
    constructor(address initialAdmin) {
        require(initialAdmin != address(0), "AttestationRegistry: zero admin");
        _grantRole(DEFAULT_ADMIN_ROLE, initialAdmin);
        _grantRole(ISSUER_ADMIN_ROLE, initialAdmin);
        _grantRole(TRUSTED_ISSUER_ROLE, initialAdmin);
    }

    /**
     * @notice Grants or revokes issuer trust.
     * @param issuer External organization or validator address.
     * @param trusted Whether the issuer should be trusted.
     */
    function setTrustedIssuer(address issuer, bool trusted) external onlyRole(ISSUER_ADMIN_ROLE) {
        if (trusted) {
            _grantRole(TRUSTED_ISSUER_ROLE, issuer);
        } else {
            _revokeRole(TRUSTED_ISSUER_ROLE, issuer);
        }
        emit TrustedIssuerUpdated(issuer, trusted, msg.sender);
    }

    /**
     * @notice Issues a typed attestation for a subject.
     * @param subject Wallet or DID-controller address receiving the attestation.
     * @param proofHash Hash of the underlying encrypted credential, data, or ZK proof transcript.
     * @param attestationType Category of attestation.
     * @param metadataURI Optional URI for encrypted metadata or schema descriptors.
     */
    function issueAttestation(
        address subject,
        bytes32 proofHash,
        AttestationType attestationType,
        string calldata metadataURI
    ) external onlyRole(TRUSTED_ISSUER_ROLE) returns (uint256 attestationId) {
        require(subject != address(0), "AttestationRegistry: zero subject");
        if (proofHash == bytes32(0)) revert EmptyProofHash();

        attestationId = nextAttestationId++;
        attestations[attestationId] = Attestation({
            proofHash: proofHash,
            issuer: msg.sender,
            timestamp: uint64(block.timestamp),
            attestationType: attestationType,
            revoked: false,
            metadataURI: metadataURI
        });
        attestationsBySubject[subject].push(attestationId);

        emit AttestationIssued(attestationId, subject, msg.sender, attestationType, proofHash, metadataURI);
    }

    /**
     * @notice Revokes an attestation. Only the original issuer can revoke its attestation.
     * @param attestationId Identifier to revoke.
     */
    function revokeAttestation(uint256 attestationId) external {
        Attestation storage attestation = attestations[attestationId];
        if (attestation.timestamp == 0) revert AttestationNotFound(attestationId);
        if (attestation.issuer != msg.sender) revert NotOriginalIssuer(msg.sender, attestation.issuer);

        attestation.revoked = true;
        emit AttestationRevoked(attestationId, msg.sender);
    }

    /**
     * @notice Returns one attestation by ID.
     * @param attestationId Identifier to inspect.
     */
    function getAttestation(uint256 attestationId) external view returns (Attestation memory) {
        Attestation memory attestation = attestations[attestationId];
        if (attestation.timestamp == 0) revert AttestationNotFound(attestationId);
        return attestation;
    }

    /**
     * @notice Returns all attestation IDs associated with a subject.
     * @param subject Subject address.
     */
    function getAttestationsBySubject(address subject) external view returns (uint256[] memory) {
        return attestationsBySubject[subject];
    }
}
