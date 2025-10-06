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

export type CreateWishlistItemRequest = {
  name: string;
  link?: string;
  participantId: string;
};
