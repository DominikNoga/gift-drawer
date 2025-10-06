import { type WishlistItem } from '../models/wish.model'

export type GetParticipantForEventResponse = {
  id: string;
  name: string;
  joinCode: string;
};

export type DrawAssignmentsRequest = {
  eventId: string;
};

export type EditParticipantWishlistRequest = {
  participantId: string;
  wishlistItems: WishlistItem[];
};
