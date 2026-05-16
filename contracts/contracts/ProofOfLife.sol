// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

interface IProofIdentityRegistry {
    function isVerified(address human) external view returns (bool);
}

/**
 * @title ProofOfLife
 * @notice Tracks periodic liveness heartbeats and validator-confirmed liveness attestations.
 * @dev This contract stores timestamps and hashed evidence references only. Future versions can replace
 * validator attestations with Semaphore, zk-SNARK, Circom, or Noir verifier calls.
 */
contract ProofOfLife is AccessControl {
    /// @notice Role allowed to confirm liveness for humans after off-chain or ZK verification.
    bytes32 public constant LIVENESS_VALIDATOR_ROLE = keccak256("LIVENESS_VALIDATOR_ROLE");

    /// @notice Role allowed to tune protocol-level heartbeat policy.
    bytes32 public constant POLICY_ADMIN_ROLE = keccak256("POLICY_ADMIN_ROLE");

    IProofIdentityRegistry public immutable identityRegistry;
    uint64 public heartbeatWindow;

    mapping(address human => uint64 timestamp) public lastProofAt;
    mapping(address human => bytes32 evidenceHash) public lastEvidenceHash;

    event HeartbeatWindowUpdated(uint64 previousWindow, uint64 newWindow, address indexed admin);
    event LifeProofSubmitted(address indexed human, uint64 indexed timestamp, bytes32 indexed evidenceHash);
    event LifeProofAttested(address indexed human, address indexed validator, uint64 indexed timestamp, bytes32 evidenceHash);

    error HumanNotVerified(address human);
    error InvalidHeartbeatWindow();

    /**
     * @notice Creates the liveness contract.
     * @param registry Identity registry used for eligibility checks.
     * @param initialHeartbeatWindow Seconds during which a proof remains current.
     * @param initialAdmin Bootstrap admin and validator.
     */
    constructor(address registry, uint64 initialHeartbeatWindow, address initialAdmin) {
        require(registry != address(0), "ProofOfLife: zero registry");
        require(initialAdmin != address(0), "ProofOfLife: zero admin");
        if (initialHeartbeatWindow == 0) revert InvalidHeartbeatWindow();

        identityRegistry = IProofIdentityRegistry(registry);
        heartbeatWindow = initialHeartbeatWindow;
        _grantRole(DEFAULT_ADMIN_ROLE, initialAdmin);
        _grantRole(POLICY_ADMIN_ROLE, initialAdmin);
        _grantRole(LIVENESS_VALIDATOR_ROLE, initialAdmin);
    }

    /**
     * @notice Allows a verified human to submit a privacy-preserving liveness heartbeat.
     * @param evidenceHash Hash of encrypted off-chain evidence, device attestation, or future ZK proof.
     */
    function submitHeartbeat(bytes32 evidenceHash) external {
        _recordProof(msg.sender, evidenceHash);
        emit LifeProofSubmitted(msg.sender, uint64(block.timestamp), evidenceHash);
    }

    /**
     * @notice Allows a validator to attest liveness for a verified human.
     * @param human Verified wallet whose liveness has been confirmed.
     * @param evidenceHash Hash of validator evidence or future ZK verification transcript.
     */
    function validatorAttest(address human, bytes32 evidenceHash) external onlyRole(LIVENESS_VALIDATOR_ROLE) {
        _recordProof(human, evidenceHash);
        emit LifeProofAttested(human, msg.sender, uint64(block.timestamp), evidenceHash);
    }

    /**
     * @notice Updates the heartbeat validity window.
     * @param newHeartbeatWindow New duration in seconds.
     */
    function setHeartbeatWindow(uint64 newHeartbeatWindow) external onlyRole(POLICY_ADMIN_ROLE) {
        if (newHeartbeatWindow == 0) revert InvalidHeartbeatWindow();
        uint64 previousWindow = heartbeatWindow;
        heartbeatWindow = newHeartbeatWindow;
        emit HeartbeatWindowUpdated(previousWindow, newHeartbeatWindow, msg.sender);
    }

    /**
     * @notice Returns whether a human is verified and has a current heartbeat.
     * @param human Wallet to inspect.
     */
    function isEligible(address human) external view returns (bool) {
        return identityRegistry.isVerified(human) && isProofCurrent(human);
    }

    /**
     * @notice Returns whether a stored heartbeat is still inside the configured window.
     * @param human Wallet to inspect.
     */
    function isProofCurrent(address human) public view returns (bool) {
        uint64 timestamp = lastProofAt[human];
        return timestamp != 0 && block.timestamp <= uint256(timestamp) + heartbeatWindow;
    }

    function _recordProof(address human, bytes32 evidenceHash) private {
        if (!identityRegistry.isVerified(human)) revert HumanNotVerified(human);
        lastProofAt[human] = uint64(block.timestamp);
        lastEvidenceHash[human] = evidenceHash;
    }
}
