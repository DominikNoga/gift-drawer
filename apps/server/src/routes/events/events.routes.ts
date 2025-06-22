import { Router } from 'express'
import { createEvent, getEventById } from './events.handlers';

const eventsRouter = Router();

eventsRouter.get('/:id', getEventById());
eventsRouter.post('/', createEvent());

export default eventsRouter;
