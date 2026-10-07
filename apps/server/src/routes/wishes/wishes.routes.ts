import { Router } from 'express';
import { addWishlistItem, getParticipantWishlist, deleteWishlistItem } from './wishes.handlers';

const wishesRouter = Router();

wishesRouter.post('/', addWishlistItem);
wishesRouter.get('/:participantId', getParticipantWishlist);
wishesRouter.delete('/:id', deleteWishlistItem);

export default wishesRouter;
