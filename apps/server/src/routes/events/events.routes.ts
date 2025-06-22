import { Router } from 'express'
import { createEvent, getEventById } from '../../handlers/events.handlers';

const eventsRouter = Router();

eventsRouter.get('/:id', getEventById());
eventsRouter.post('/', createEvent());

export default eventsRouter;
