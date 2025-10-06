import { Request, Response } from 'express';
import { GetParticipantWishlistParams } from '@gd/types/src/api/api.wishes.types';
import { WishlistItem } from '@gd/types/src/models/wish.model';
import { ApiResponse } from '@gd/types/src/api/api.types';

export const getParticipantWishlist = async (request: Request<GetParticipantWishlistParams>, response: Response<ApiResponse<WishlistItem[]>>) => {
  const { participantId } = request.params;
  
};

export const createWishlistItem = async (request: Request, response: Response) => {
};

export const editWishlistItem = async (request: Request, response: Response) => {
  const { id } = request.params;
  const wishData = request.body;
  response.json({ wish: { id, ...wishData } });
};

export const deleteWishlistItem = async (request: Request, response: Response) => {
  const { id } = request.params;
  response.status(204).send();
};
