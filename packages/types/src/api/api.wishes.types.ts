import { z } from "zod";
import { WishlistItemCreateSchema } from "../models/wish.model";

export type WishlistModifyParam = {
  id: string;
};

export type GetParticipantWishlistParams = {
  participantId: string;
};

export type EditWishlistItemRequest = {
  name: string;
  link?: string;
};

export type CreateWishlistItemRequest = z.infer<typeof WishlistItemCreateSchema>;
