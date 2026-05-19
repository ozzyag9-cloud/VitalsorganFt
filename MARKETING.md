# VitalOS: The Biological Operating System
## Marketing & Campaign Manifesto (Phase Alpha)

### 1. The Vision
**"Everything is Open. Your Sovereignty is Absolute."**
VitalOS is more than a web application; it is the world’s first **Biological Operating System (BOS)**. We are bridging the gap between human physiology and the blockchain, turning your biological vitals into liquid, sovereign assets.

### 2. Core Pillars (The "V" System)
- **V-Pass (Identity)**: Biometric-to-Web3 bridge. Use your email and FaceID/TouchID to derive a sovereign wallet. No seed phrases, just you.
- **V-Tok & V-Gram (On-Chain Social)**: A decentralized social layer where content is minted as it's streamed. High-speed, censorship-resistant, and biologically aware.
- **V-Stream (Media)**: The first protocol that splits media into nano-segments, minting them to the ledger in real-time for millisecond-precision royalty tracking.
- **Biometric dNFTs**: Your health is your wealth. Own your "Genesis Pulse" certificate—a living NFT that evolves (or decays) based on your real-world biometric data.

### 3. The Visual Identity (Toxic & Obsidian)
- **Obsidian (#030509)**: The darkness of the secure enclave.
- **Toxic Green (#00FF41)**: The color of biological synchronization and high-performance execution.
- **Glassmorphism**: Transparent, high-tech interface panels that feel like hardware-bound software.

### 4. Campaign Strategy: "The Great Synchronization"
- **Hook**: "Stop being the product. Start being the OS."
- **Action**: Launching Phase 1 Genesis Mint of hardware-bound certificates (Pulse, Nexus, Sovereign).
- **Incentive**: Early adopters earn $VITAL yield for active node participation and biological check-ins.

---

# Sepolia Testnet Deployment Guide
## Technical Requirements & Steps

### 1. Prerequisites
- **Sepolia ETH**: Obtain testnet ETH from a faucet (e.g., Alchemy, Infura, or Google Cloud Faucet).
- **Deployment Wallet**: MetaMask, Phantom EVM, or any wallet supporting Sepolia.
- **Contract Code**: Use the `Vitals.sol` file located in the root directory.

### 2. Deployment Steps (via Remix)
1. Open [Remix IDE](https://remix.ethereum.org/).
2. Create a new file named `Vitals.sol` and paste the code from this project.
3. **Dependencies**: Ensure you import the OpenZeppelin and ERC721A libraries (Remix handles this via URL or npm).
4. **Compile**: Use Solidity compiler `0.8.20` or higher.
5. **Deploy**:
   - Environment: Select **Injected Provider - MetaMask** (Connected to Sepolia).
   - Constructor Arguments:
     - `_oracle`: Your server's public public address (to authorize health updates).
     - `_initialBaseURI`: `https://api.vitalos.space/v1/metadata/`
   - Click **Transact**.

### 3. Frontend Integration
Once deployed, copy the **Contract Address** and update the following in `src/App.tsx`:
- `const VITALS_CONTRACT_ADDRESS = "0xYourNewContractAddress";`
- Update the ABI if you modified the contract.

### 4. Oracle Setup
The `Vitals.sol` contract requires an `oracle` address. This address is the ONLY one authorized to call `updateHealth`. Your backend `server.ts` should be configured to sign transactions from this authorized address.
