import { Router } from 'express'
import { 
  addWishlistItem,
  getParticipantWishlist,
  editWishlistItem,
  deleteWishlistItem
} from './wishes.handlers';

const wishesRouter = Router();

wishesRouter.post('/', addWishlistItem);
wishesRouter.get('/:participantId', getParticipantWishlist);
wishesRouter.put('/:id', editWishlistItem);
wishesRouter.delete('/:id', deleteWishlistItem);

export default wishesRouter;
