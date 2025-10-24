import { Router } from 'express'
import { 
  createEvent, 
  drawAssignments, 
  getEvent, 
  getEventIdByParticipantCode,
} from './events.handlers';

const eventsRouter = Router();

eventsRouter.post('/:id/draw', drawAssignments);
eventsRouter.get('/join/:joinCode', getEventIdByParticipantCode);
eventsRouter.get('/:id/:joinCode', getEvent);
eventsRouter.get('/', (req, res) => { res.status(200).json({ ok: true, message: "Events API is working" }); });
eventsRouter.post('/', createEvent);

export default eventsRouter;
