# Proof of Life OS Image

Proof of Life OS is an appliance-image blueprint for running a validator, oracle, API gateway, and local privacy services as one hardened node image. It is intentionally designed as an operational package, not a consumer surveillance device.

## Image goals

- boot a complete Proof of Life node with chain, backend, oracle, and telemetry services;
- run with least privilege using systemd service isolation;
- support remote attestation and measured boot in later milestones;
- keep raw sensor data on-device and export only hashes, commitments, signatures, and ZK proofs;
- allow governments, NGOs, hospitals, schools, and citizen validators to run reproducible nodes.

## Included files

- `config/node.config.json` — node role, network, privacy, oracle, sensor, and service configuration.
- `systemd/proof-of-life-node.service` — hardened service wrapper for the chain node.
- `systemd/proof-of-life-backend.service` — hardened service wrapper for the local API.
- `docker-compose.yml` — local appliance composition for development or edge deployments.
- `scripts/build-os-image.sh` — reproducible image-build entrypoint for future Packer/live-build integration.

## Recommended image layers

1. Minimal Linux base with secure boot support.
2. Node.js runtime and protocol binaries.
3. Proof of Life chain node.
4. Backend API and oracle adapters.
5. Sensor gateway with hardware attestation.
6. Local encrypted cache and queue.
7. Monitoring with privacy-safe metrics only.
8. Systemd hardening, firewall, automatic updates, and audit logs.

## Hardware stance

Ambient intelligence is a strong idea if it is used as multi-signal corroboration rather than as always-on surveillance. The OS must enforce local processing, consent, data minimization, and proof export. The alternative is a purely credential-based model, but that is less resistant to remote fraud and account sharing. The recommended game-changing path is hybrid: ambient intelligence for high-assurance moments, zero-knowledge credentials for daily use, and human appeal for public services.
