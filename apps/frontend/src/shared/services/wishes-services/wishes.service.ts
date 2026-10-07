import axios from 'axios';
import { apiDelete, get, post } from '@gd/shared/utils/api.utils';
import type { WishlistItem } from '@gd/types/src/models/wish.model';
import type { CreateWishlistItemRequest } from '@gd/types/src/api/api.wishes.types';

const API_URL = '/wishes';

export const getParticipantWishlist = async (participantId: string): Promise<WishlistItem[]> => {
  return get<WishlistItem[]>(`${API_URL}/${participantId}`);
};

export const addWishlistItem = async (item: CreateWishlistItemRequest): Promise<WishlistItem> => {
  try {
    return await post<WishlistItem>(`${API_URL}`, item);
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        err.response.data?.message || 'An unexpected error occurred. Please try again.',
      );
    }
    throw err;
  }
};

export const deleteWishlistItem = async (itemId: string): Promise<void> => {
  return apiDelete<void>(`${API_URL}/${itemId}`);
};
