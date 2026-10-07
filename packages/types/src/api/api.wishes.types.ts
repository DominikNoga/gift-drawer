import { z } from 'zod';
import { WishlistItemCreateSchema } from '../models/wish.model';

export type GetParticipantWishlistParams = {
  participantId: string;
};

export type CreateWishlistItemRequest = z.infer<typeof WishlistItemCreateSchema>;
