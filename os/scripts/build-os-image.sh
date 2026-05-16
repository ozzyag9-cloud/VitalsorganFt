#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
IMAGE_NAME="${IMAGE_NAME:-proof-of-life-os}"
IMAGE_TAG="${IMAGE_TAG:-devnet}"
OUTPUT_DIR="${OUTPUT_DIR:-$ROOT_DIR/os/out}"

mkdir -p "$OUTPUT_DIR/rootfs/etc/proof-of-life" "$OUTPUT_DIR/rootfs/opt/proof-of-life" "$OUTPUT_DIR/rootfs/etc/systemd/system"
cp "$ROOT_DIR/os/config/node.config.json" "$OUTPUT_DIR/rootfs/etc/proof-of-life/node.config.json"
cp "$ROOT_DIR/os/systemd/"*.service "$OUTPUT_DIR/rootfs/etc/systemd/system/"

cat > "$OUTPUT_DIR/README.txt" <<EOF_INNER
$IMAGE_NAME:$IMAGE_TAG appliance rootfs staged at $OUTPUT_DIR/rootfs

Next production step: feed this rootfs into Packer, Debian live-build, Yocto, or an OEM secure-boot image pipeline.
EOF_INNER

printf 'Proof of Life OS rootfs staged: %s\n' "$OUTPUT_DIR/rootfs"
