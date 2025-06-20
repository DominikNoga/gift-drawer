import { z } from 'zod';
import { db } from '../db/db';

export const EventSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
    .max(100)
    .min(3),
  description: z.string(),
  giftBudget: z.number()
    .int()
    .min(1)
    .optional()
});
