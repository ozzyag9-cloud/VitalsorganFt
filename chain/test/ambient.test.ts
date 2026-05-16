import assert from 'node:assert/strict';
import { fuseAmbientProof } from '../src/ambient/sensorFusion.js';
import { hashJson } from '../src/consensus/blockBuilder.js';
import type { AmbientSensorReading, SensorType } from '../src/ambient/sensorFusion.js';

const now = 1_700_000_000_000;
const subjectCommitment = hashJson('subject');
const sensorTypes: SensorType[] = ['heart_rate_variability', 'blood_oxygen', 'motion_gait', 'device_secure_enclave'];

const readings: AmbientSensorReading[] = sensorTypes.map((sensorType, index) => ({
  subjectCommitment,
  deviceId: hashJson(`device-${index}`),
  sensorType,
  readingHash: hashJson(`reading-${sensorType}`),
  confidence: 0.82,
  capturedAt: now - 1_000,
  expiresAt: now + 60_000,
  deviceSignature: hashJson(`signature-${sensorType}`),
}));

const decision = fuseAmbientProof(readings, now);
assert.equal(decision.accepted, true);
assert.equal(decision.distinctSensorTypes.length, 4);
assert.equal(decision.reasons.length, 0);

const weakDecision = fuseAmbientProof(readings.slice(0, 2), now);
assert.equal(weakDecision.accepted, false);
assert.ok(weakDecision.reasons.includes('not enough distinct sensor modalities'));
console.log('ambient fusion tests passed');
