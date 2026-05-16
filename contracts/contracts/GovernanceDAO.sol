// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Governor} from "@openzeppelin/contracts/governance/Governor.sol";
import {GovernorCountingSimple} from "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import {GovernorSettings} from "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import {GovernorVotes} from "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import {GovernorVotesQuorumFraction} from "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";

/**
 * @title GovernanceDAO
 * @notice Foundational Governor for Proof of Life protocol governance.
 * @dev Uses an external IVotes-compatible token today. Future versions can adapt vote weight to verified
 * identity, soulbound citizenship, proof-of-life freshness, treasury modules, and ZK anti-Sybil proofs.
 */
contract GovernanceDAO is Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction {
    /**
     * @notice Initializes DAO governance parameters.
     * @param votesToken IVotes-compatible token representing current voting power.
     * @param initialVotingDelay Blocks before voting starts after proposal creation.
     * @param initialVotingPeriod Blocks during which votes can be cast.
     * @param initialProposalThreshold Minimum votes needed to create proposals.
     * @param initialQuorumFraction Percentage quorum expressed as a whole-number fraction.
     */
    constructor(
        IVotes votesToken,
        uint48 initialVotingDelay,
        uint32 initialVotingPeriod,
        uint256 initialProposalThreshold,
        uint256 initialQuorumFraction
    )
        Governor("Proof of Life Governance DAO")
        GovernorSettings(initialVotingDelay, initialVotingPeriod, initialProposalThreshold)
        GovernorVotes(votesToken)
        GovernorVotesQuorumFraction(initialQuorumFraction)
    {}

    /** @inheritdoc Governor */
    function votingDelay() public view override(Governor, GovernorSettings) returns (uint256) {
        return super.votingDelay();
    }

    /** @inheritdoc Governor */
    function votingPeriod() public view override(Governor, GovernorSettings) returns (uint256) {
        return super.votingPeriod();
    }

    /** @inheritdoc Governor */
    function proposalThreshold() public view override(Governor, GovernorSettings) returns (uint256) {
        return super.proposalThreshold();
    }

    /** @inheritdoc Governor */
    function quorum(uint256 blockNumber) public view override(Governor, GovernorVotesQuorumFraction) returns (uint256) {
        return super.quorum(blockNumber);
    }

    /** @inheritdoc Governor */
    function state(uint256 proposalId) public view override(Governor) returns (ProposalState) {
        return super.state(proposalId);
    }

    /** @inheritdoc Governor */
    function proposalNeedsQueuing(uint256 proposalId) public view override(Governor) returns (bool) {
        return super.proposalNeedsQueuing(proposalId);
    }

    /** @inheritdoc Governor */
    function _propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        address proposer
    ) internal override(Governor) returns (uint256) {
        return super._propose(targets, values, calldatas, description, proposer);
    }

    /** @inheritdoc Governor */
    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    /** @inheritdoc Governor */
    function _executor() internal view override(Governor) returns (address) {
        return super._executor();
    }
}
