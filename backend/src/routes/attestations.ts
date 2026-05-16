import { Router } from 'express';
import { z } from 'zod';

export const attestationRouter = Router();

const validatorAttestationSchema = z.object({
  subject: z.string().min(1),
  attestationType: z.enum(['identity', 'liveness', 'healthcare', 'education', 'humanitarian_aid', 'dao_eligibility', 'custom']),
  proofHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  metadataURI: z.string().optional(),
  issuerSignature: z.string().min(1),
});

attestationRouter.post('/validator', (request, response) => {
  const payload = validatorAttestationSchema.parse(request.body);
  response.status(202).json({
    status: 'accepted',
    message: 'Validator attestation queued for policy checks and optional on-chain submission.',
    attestation: payload,
  });
});
