import { z } from 'zod';
import { type SnakeCaseKeys } from '../utils/types.utils';

export const MAX_WISH_NAME_LENGTH = 255;
export const MAX_WISH_LINK_LENGTH = 2048;

export const WishlistItemSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .min(1, 'Item name is required')
    .max(MAX_WISH_NAME_LENGTH, `Item name can have at most ${MAX_WISH_NAME_LENGTH} characters`),
  link: z
    .string()
    .url('Link must be a valid URL')
    .max(MAX_WISH_LINK_LENGTH, `Link can have at most ${MAX_WISH_LINK_LENGTH} characters`)
    .optional(),
  participantId: z.string(),
});

export const WishlistItemCreateSchema = WishlistItemSchema.omit({ id: true });

export type WishlistItem = z.infer<typeof WishlistItemSchema>;
export type WishlistItemDbRecord = SnakeCaseKeys<WishlistItem>;
