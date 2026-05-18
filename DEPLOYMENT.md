# VitalOS Deployment & Launch Manifesto

## 1. Domain Connection (vitalos.space)
To connect your custom domain to this application:
1. **Export Code:** Click the "Settings" (gear icon) in the AI Studio sidebar and select **Export to GitHub**.
2. **Hosting:** Primary recommendations are **Vercel** or **Netlify** for the frontend.
3. **DNS Settings:** 
   - Login to your domain registrar for `vitalos.space`.
   - Add a `CNAME` record pointing `www` to your hosting provider.
   - Add an `A` record pointing `@` (root) to the hosting provider's IP.

## 2. V-Pass Identity System (Email-to-Web3)
The system is designed to use **WebAuthn (Passkeys)**:
- **User Experience:** User enters their standard email.
- **Biometric Event:** The OS triggers a FaceID/TouchID prompt.
- **Key Derivation:** A private key is derived locally in the secure enclave.
- **Web3 bridge:** This key signs a message that creates a sovereign session on `vitalos.space`.
- **Outcome:** The user never handles a mnemonic seed, but owns the account via their email identity.

## 3. V-Codec & Media On-Chain
- **Mint-on-Stream:** The V-Codec v4.2 algorithm splits video into "Nano-Segments".
- **Batching:** Segments are batched into ZK-Rollups and posted to the Solana ledger.
- **Proof of Royalty:** Since every segment is minted, filmmakers can track usage down to the millisecond on-chain.

## 4. Launch Campaign Strategy (X / Twitter)
1. **The Teaser:** Posts showing the "Toxic & Obsidian" UI with the "Everything is Open" slogan.
2. **The 15-Day Trial:** Launch the web-app version first.
3. **The dNFT Mint:** Exclusive "Genesis Kernel" dNFTs that grant perpetual "Bare Metal" installation rights.
4. **The Yield:** Active $VITAL rewards for users who run the "Lite-Node" in their settings.
