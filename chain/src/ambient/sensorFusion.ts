import { createHash } from 'node:crypto';
import type { Hex } from '../types.js';

export type SensorType =
  | 'heart_rate_variability'
  | 'blood_oxygen'
  | 'skin_temperature'
  | 'motion_gait'
  | 'voice_liveness'
  | 'face_liveness'
  | 'device_secure_enclave'
  | 'location_proximity'
  | 'network_presence';

export interface AmbientSensorReading {
  readonly subjectCommitment: Hex;
  readonly deviceId: Hex;
  readonly sensorType: SensorType;
  readonly readingHash: Hex;
  readonly confidence: number;
  readonly capturedAt: number;
  readonly expiresAt: number;
  readonly deviceSignature: Hex;
}

export interface AmbientFusionPolicy {
  readonly minDistinctSensorTypes: number;
  readonly minBiometricSignals: number;
  readonly minDeviceSignals: number;
  readonly minAverageConfidence: number;
  readonly maxReadingAgeMs: number;
}

export interface AmbientProofDecision {
  readonly accepted: boolean;
  readonly proofHash: Hex;
  readonly averageConfidence: number;
  readonly distinctSensorTypes: readonly SensorType[];
  readonly reasons: readonly string[];
}

const biometricSignals = new Set<SensorType>([
  'heart_rate_variability',
  'blood_oxygen',
  'skin_temperature',
  'motion_gait',
  'voice_liveness',
  'face_liveness',
]);

const deviceSignals = new Set<SensorType>(['device_secure_enclave', 'location_proximity', 'network_presence']);

export const defaultAmbientFusionPolicy: AmbientFusionPolicy = {
  minDistinctSensorTypes: 4,
  minBiometricSignals: 2,
  minDeviceSignals: 1,
  minAverageConfidence: 0.72,
  maxReadingAgeMs: 5 * 60 * 1000,
};

/**
 * Fuses hashed ambient-intelligence readings into a privacy-preserving proof decision.
 * Raw sensor values must never enter this function; devices submit only hashes, confidence,
 * timestamps, and signatures that can later be checked by validator/oracle services.
 */
export function fuseAmbientProof(
  readings: readonly AmbientSensorReading[],
  now = Date.now(),
  policy = defaultAmbientFusionPolicy,
): AmbientProofDecision {
  const reasons: string[] = [];
  const freshReadings = readings.filter((reading) => reading.expiresAt >= now && now - reading.capturedAt <= policy.maxReadingAgeMs);
  const distinctSensorTypes = [...new Set(freshReadings.map((reading) => reading.sensorType))].sort();
  const averageConfidence = freshReadings.length === 0 ? 0 : freshReadings.reduce((sum, reading) => sum + reading.confidence, 0) / freshReadings.length;
  const biometricCount = distinctSensorTypes.filter((type) => biometricSignals.has(type)).length;
  const deviceCount = distinctSensorTypes.filter((type) => deviceSignals.has(type)).length;

  if (freshReadings.length !== readings.length) reasons.push('one or more readings are expired or stale');
  if (distinctSensorTypes.length < policy.minDistinctSensorTypes) reasons.push('not enough distinct sensor modalities');
  if (biometricCount < policy.minBiometricSignals) reasons.push('not enough biometric liveness modalities');
  if (deviceCount < policy.minDeviceSignals) reasons.push('not enough device or environmental integrity modalities');
  if (averageConfidence < policy.minAverageConfidence) reasons.push('average confidence below policy threshold');

  return {
    accepted: reasons.length === 0,
    proofHash: hashAmbientReadings(freshReadings, policy),
    averageConfidence,
    distinctSensorTypes,
    reasons,
  };
}

export function hashAmbientReadings(readings: readonly AmbientSensorReading[], policy: AmbientFusionPolicy): Hex {
  const canonical = [...readings]
    .map((reading) => ({
      subjectCommitment: reading.subjectCommitment,
      deviceId: reading.deviceId,
      sensorType: reading.sensorType,
      readingHash: reading.readingHash,
      confidence: Math.round(reading.confidence * 10_000),
      capturedAt: reading.capturedAt,
      expiresAt: reading.expiresAt,
      deviceSignature: reading.deviceSignature,
    }))
    .sort((a, b) => `${a.deviceId}:${a.sensorType}:${a.readingHash}`.localeCompare(`${b.deviceId}:${b.sensorType}:${b.readingHash}`));

  return `0x${createHash('sha256').update(JSON.stringify({ readings: canonical, policy })).digest('hex')}`;
}
