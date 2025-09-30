import { Router } from 'express'
import { createEvent, getEventById, getAllEvents } from './events.handlers';

const eventsRouter = Router();

eventsRouter.get('/:id', getEventById());
eventsRouter.get('/', getAllEvents());
eventsRouter.post('/', createEvent());

export default eventsRouter;
