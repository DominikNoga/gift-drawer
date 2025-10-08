import { z } from 'zod';
import { type SnakeCaseKeys } from '../utils/types.utils';

export const WishlistItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  link: z.string().url().optional(),
  participantId: z.string(),
});

export const WishlistItemCreateSchema = WishlistItemSchema.omit({ id: true });

export type WishlistItem = z.infer<typeof WishlistItemSchema>;
export type WishlistItemDbRecord = SnakeCaseKeys<WishlistItem>;