import { Router } from 'express';
import { checkPostgres } from '../db/postgres.js';
import { checkRedis } from '../db/redis.js';

export const healthRouter = Router();

healthRouter.get('/', async (_request, response) => {
  const [postgres, redis] = await Promise.allSettled([checkPostgres(), checkRedis()]);
  response.status(200).json({
    status: 'ok',
    service: 'proof-of-life-backend',
    dependencies: {
      postgres: postgres.status === 'fulfilled' && postgres.value,
      redis: redis.status === 'fulfilled' && redis.value,
    },
  });
});
