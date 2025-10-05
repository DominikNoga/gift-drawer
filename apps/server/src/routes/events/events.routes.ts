import { Router } from 'express'
import { createEvent, getEventById, getAllEvents, getEventIdByParticipantCode } from './events.handlers';

const eventsRouter = Router();

eventsRouter.get('/:id', getEventById());
eventsRouter.get('/join/:joinCode', getEventIdByParticipantCode());
eventsRouter.get('/', getAllEvents());
eventsRouter.post('/', createEvent());

export default eventsRouter;
