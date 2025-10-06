import { Router } from 'express'
import { 
  createWishlistItem,
  getParticipantWishlist,
  editWishlistItem,
  deleteWishlistItem
} from './wishes.handlers';

const eventsRouter = Router();

eventsRouter.post('/', createWishlistItem);
eventsRouter.get('/:participantId', getParticipantWishlist);
eventsRouter.put('/:id', editWishlistItem);
eventsRouter.delete('/:id', deleteWishlistItem);

export default eventsRouter;
