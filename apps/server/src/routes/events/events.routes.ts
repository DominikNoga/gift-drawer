import { Router } from 'express'
import { createEvent, getEvent, getEventIdByParticipantCode } from './events.handlers';

const eventsRouter = Router();

eventsRouter.get('/join/:joinCode', getEventIdByParticipantCode());
eventsRouter.get('/:id/:joinCode', getEvent());
eventsRouter.post('/', createEvent());

export default eventsRouter;
