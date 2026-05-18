// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title VITALS: Phygital Health Protocol
 * @notice Living dNFTs that evolve based on real biometric data.
 */
contract Vitals is ERC721A, Ownable {
    using Strings for uint256;

    enum OrganType { Heart, Brain, Lungs, Gut, Skin }
    enum EvolutionState { Embryonic, Vital, Resilient, Thriving, Ascendant, Immortal, Stressed, Critical }

    struct TokenData {
        OrganType organType;
        uint8 healthScore; // 0-100
        EvolutionState currentState;
        uint16 currentStreak;
        uint32 lastCheckIn;
        uint32 mintedAt;
        uint8 earnedTraits; // bitmask for permanent traits
    }

    mapping(uint256 => TokenData) public tokens;
    address public oracle;
    string public baseURI;

    event HealthUpdated(uint256 indexed tokenId, uint8 newScore, EvolutionState newState);
    event MilestoneEarned(uint256 indexed tokenId, uint8 traitBit);

    constructor(address _oracle, string memory _initialBaseURI) 
        ERC721A("VITALS Protocol", "VTL") 
        Ownable(msg.sender) 
    {
        oracle = _oracle;
        baseURI = _initialBaseURI;
    }

    /**
     * @notice Mint a new Genesis Vital.
     */
    function mint(OrganType _organ) external payable {
        require(msg.value >= 0.05 ether, "Insufficient payment");
        uint256 startId = _nextTokenId();
        _mint(msg.sender, 1);
        
        tokens[startId] = TokenData({
            organType: _organ,
            healthScore: 60,
            currentState: EvolutionState.Embryonic,
            currentStreak: 0,
            lastCheckIn: uint32(block.timestamp),
            mintedAt: uint32(block.timestamp),
            earnedTraits: 0
        });
    }

    /**
     * @notice Authorized oracle updates health state.
     */
    function updateHealth(uint256 tokenId, uint8 newScore, uint16 newStreak) external {
        require(msg.sender == oracle, "Only oracle");
        TokenData storage t = tokens[tokenId];
        
        // Health score decay if missed check-in (> 24h)
        uint256 timeSinceLast = block.timestamp - t.lastCheckIn;
        if (timeSinceLast > 86400) {
            uint8 decay = uint8((timeSinceLast / 86400) * 2); // Decay 2 points per day missed
            if (newScore > decay) {
                newScore -= decay;
            } else {
                newScore = 0;
            }
        }

        t.healthScore = newScore;
        t.currentStreak = newStreak;
        t.lastCheckIn = uint32(block.timestamp);
        
        // Logic for evolution and traits
        _computeState(tokenId);
        
        emit HealthUpdated(tokenId, newScore, t.currentState);
    }

    function _computeState(uint256 tokenId) internal {
        TokenData storage t = tokens[tokenId];
        
        if (t.healthScore < 20) t.currentState = EvolutionState.Critical;
        else if (t.healthScore < 50) t.currentState = EvolutionState.Stressed;
        else {
            // Milestone checks
            if (t.currentStreak >= 7 && t.healthScore >= 70) _earnTrait(tokenId, 0); // Vital
            if (t.currentStreak >= 30 && t.healthScore >= 75) _earnTrait(tokenId, 1); // Resilient
            if (t.currentStreak >= 60 && t.healthScore >= 80) _earnTrait(tokenId, 2); // Thriving
            if (t.currentStreak >= 90 && t.healthScore >= 90) _earnTrait(tokenId, 3); // Ascendant
            if (t.currentStreak >= 180 && t.healthScore >= 90) _earnTrait(tokenId, 4); // Immortal
            
            // Set state based on traits
            if ((t.earnedTraits >> 4) & 1 == 1) t.currentState = EvolutionState.Immortal;
            else if ((t.earnedTraits >> 3) & 1 == 1) t.currentState = EvolutionState.Ascendant;
            // ... etc
        }
    }

    function _earnTrait(uint256 tokenId, uint8 bit) internal {
        if ((tokens[tokenId].earnedTraits >> bit) & 1 == 0) {
            tokens[tokenId].earnedTraits |= uint8(1 << bit);
            emit MilestoneEarned(tokenId, bit);
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }
}
