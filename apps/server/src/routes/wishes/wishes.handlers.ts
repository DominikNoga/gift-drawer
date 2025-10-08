import { Request, Response } from 'express';
import { CreateWishlistItemRequest, GetParticipantWishlistParams } from '@gd/types/src/api/api.wishes.types';
import { WishlistItem, WishlistItemCreateSchema } from '@gd/types/src/models/wish.model';
import { ApiResponse } from '@gd/types/src/api/api.types';
import { HTTP_STATUS } from '../../constants/status-codes';
import { createWishlistItemRecord } from './wishes.utils';
import { wishesTable } from './wishes.db';
import { toApiSchema } from '../../utils/change-case.utils';

export const getParticipantWishlist = async (request: Request<GetParticipantWishlistParams>, response: Response<ApiResponse<WishlistItem[]>>) => {
  const { participantId } = request.params;

  try {
    const wishlist = await wishesTable().where('participant_id', participantId).select('*');
    const apiResponse = wishlist.map(item => toApiSchema(item));
    return response.status(HTTP_STATUS.OK).json(apiResponse);
  } catch (error) {
    console.error('Error retrieving wishlist:', error);
    return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to retrieve wishlist', error });
  }

};

export const addWishlistItem = async (request: Request<{}, {}, CreateWishlistItemRequest>, response: Response) => {
  const wishData = request.body;
  const parseResult = WishlistItemCreateSchema.safeParse(wishData);
  if (!parseResult.success) {
    console.error('Validation failed:', parseResult.error);
    return response.status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: 'Invalid input', error: parseResult.error });
  }

  try {
    const createdWish = await createWishlistItemRecord(parseResult.data);
    console.log('Wishlist item created with ID:', createdWish.id);
    return response.status(HTTP_STATUS.CREATED).json(createdWish);
  } catch (error) {
    return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to create wishlist item', error });
  }
};

export const editWishlistItem = async (request: Request, response: Response) => {
  const { id } = request.params;
  const wishData = request.body;
  response.json({ wish: { id, ...wishData } });
};

export const deleteWishlistItem = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    console.log(`Deleting wishlist item with ID: ${id}`);
    await wishesTable().where('id', id).del();
  } catch (error) {
    console.error('Error deleting wishlist item:', error);
    return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to delete wishlist item', error });
  }
  return response.status(HTTP_STATUS.NO_CONTENT).send();
};
