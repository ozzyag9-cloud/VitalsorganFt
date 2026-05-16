import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { attestationRouter } from './routes/attestations.js';
import { healthRouter } from './routes/health.js';
import { requestLogger } from './middleware/requestLogger.js';

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(requestLogger);

  app.get('/', (_request, response) => {
    response.json({ name: 'Proof of Life Protocol API', status: 'ready' });
  });
  app.use('/health', healthRouter);
  app.use('/api/attestations', attestationRouter);

  return app;
}
