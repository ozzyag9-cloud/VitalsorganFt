# Proof of Life Hardware and Ambient Intelligence

## Recommendation

Ambient intelligence is a good and differentiated direction if it is built as consent-based, edge-processed, multi-sensor proof generation. It becomes dangerous if it is implemented as continuous surveillance. The winning design is a **Proof Pod**: a personal or institutional edge device that observes multiple weak signals locally, fuses them into a confidence proof, signs the result in secure hardware, and sends only commitments or ZK proofs to the chain.

## Proof Pod reference design

### Required modules

- Secure element or TPM for device identity and remote attestation.
- Biometric liveness inputs such as heart-rate variability, blood oxygen, skin temperature, motion/gait, face liveness, or voice liveness.
- Environmental inputs such as location proximity, network presence, room context, or authorized facility beacons.
- Connectivity through Ethernet, Wi-Fi, LTE/5G, Bluetooth Low Energy, NFC, and optionally LoRaWAN for remote areas.
- Local encrypted storage for short-lived queues only.
- Physical privacy controls: visible capture indicator, hardware kill switch, and consent button.

### Privacy requirements

- Raw biometric and environmental readings stay on-device.
- The device emits `readingHash`, confidence, timestamp, device ID, and signature.
- Sensitive public-service decisions require an appeal route and human review.
- High-risk domains require zero-knowledge proofs and domain council approval.

## Hardware tiers

### Tier 1: Citizen mobile node

- Smartphone wallet plus secure enclave/passkey.
- Uses mobile sensors for occasional liveness.
- Best for low-risk proof-of-life refresh and DAO citizenship.

### Tier 2: Home or clinic Proof Pod

- Dedicated edge box with biometric peripherals and secure element.
- Best for health, welfare, remote care, education exams, and family services.

### Tier 3: Institutional validator station

- Hardened node operated by hospitals, schools, agencies, NGOs, or election offices.
- Supports multiple peripherals, audited logs, and remote attestation.

## Alternative game-changing architecture

If hardware is too expensive or politically sensitive at first, use a **three-layer trust mesh**:

1. Verifiable credentials from trusted institutions.
2. Zero-knowledge uniqueness and eligibility proofs.
3. Optional ambient Proof Pod checks only for high-assurance moments.

This alternative is easier to pilot with governments because it starts with documents and institutions they understand, then adds ambient intelligence where it provides clear value.
