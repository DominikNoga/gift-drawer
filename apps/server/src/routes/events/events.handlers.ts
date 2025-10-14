import { Request, response, Response } from 'express';
import { eventsTable } from './events.db';
import { EventCreateSchema } from '@gd/types/src/models/events.model';
import { EventIdResponse, GetEventByJoinCodeRequest, CreateEventResponse, CreateEventRequest, GetEventRequest, GetEventResponse } from '@gd/types/src/api/api.events.types';
import { ApiResponse } from '@gd/types/src/api/api.types';
import { participantsTable } from '../participants/participants.db';
import { HTTP_STATUS } from '../../constants/status-codes';
import { createExclusions, createParticipants, getEventData, getEventRow } from './events.utils';
import { toApiSchema } from '../../utils/change-case.utils';
import { drawSecretSanta } from '../../utils/drawing-logic.utils';
import { exclusionsTable } from '../exclusions/exclusions.db';
import { DrawAssignmentsRequest, EditParticipantWishlistRequest } from '@gd/types/src/api/api.participants.types';

export const getEvent = async (request: Request<GetEventRequest>, response: Response<ApiResponse<GetEventResponse>>) => {
  const { id, joinCode } = request.params;
  const eventRow = await eventsTable()
    .where({ id })
    .first();

  if (!eventRow) {
    return response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Event not found' });
  }

  const eventData = await getEventData(id, eventRow, joinCode);

  return response.status(HTTP_STATUS.OK).json(eventData);
};

export const createEvent = async (request: Request<{}, {}, CreateEventRequest>, response: Response<ApiResponse<CreateEventResponse>>) => {
  const parseResult = EventCreateSchema.safeParse(request.body);
  console.log(parseResult);

  if (!parseResult.success) {
    console.log(parseResult.error);
    return response.status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: 'Invalid input', error: parseResult.error });
  }

  const input = parseResult.data;
  const { participants, exclusions, ...createEventRequest } = input;

  const dbData = getEventRow(createEventRequest);

  await eventsTable().insert(dbData);
  let organizerCode = '';
  if (participants && participants.length) {
    const createdParticipants = await createParticipants(participants.map(p => p.name), dbData.id);
    organizerCode = createdParticipants.find(p => p.name === dbData.organizer_name)?.joinCode || '';
    if (exclusions && exclusions.length) {
      const exclusionsCreateResults = await createExclusions(exclusions, createdParticipants, dbData.id);
      if (typeof exclusionsCreateResults === 'string') {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
          message: exclusionsCreateResults
        });
      }
    }
  }

  return response.status(HTTP_STATUS.CREATED).json({
    id: dbData.id,
    organizerCode: organizerCode,
  });
};

export const getEventIdByParticipantCode = async (request: Request<GetEventByJoinCodeRequest>, response: Response<ApiResponse<EventIdResponse>>) => {
  const { joinCode } = request.params;
  const participant = await participantsTable()
    .where({ join_code: joinCode }).first();

  if (!participant) {
    return response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Participant not found' });
  }

  const eventRow = await eventsTable()
    .where({ id: participant.event_id })
    .first()
    .select('id');

  if (!eventRow) {
    return response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Event not found' });
  }
  
  return response.status(HTTP_STATUS.OK).json({ id: eventRow.id });
};

export const drawAssignments = async (request: Request<{}, DrawAssignmentsRequest>, response: Response) => {
  const { eventId } = request.body;
  const participants = await participantsTable()
    .where({ event_id: eventId })
    .select('*');
  const exclusions = await exclusionsTable()
    .where({ event_id: eventId })
    .select('*');

  const validParticipants = participants.map(toApiSchema);
  const validExclusions = exclusions.map(toApiSchema);
  const drawingResult = drawSecretSanta(validParticipants, validExclusions);

  if (!drawingResult.ok) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Drawing failed',
      reasons: drawingResult.reasons,
      debug: drawingResult.debug,
    });
  }

  const { assignments } = drawingResult;
  console.log(assignments);
  await Promise.all(assignments.map(a => participantsTable()
    .where({ id: a.giverId })
    .update({ drawn_participant_id: a.receiverId })));

  return response.status(HTTP_STATUS.OK).json({ drawingResult });
};

// export const getAllEvents = () => async (request: Request, response: Response) => {
//   const eventRows = await eventsTable().select();

//   const eventsData = await Promise.all(eventRows.map(async (eventRow) => getEventData(eventRow.id, eventRow)));

//   return response.status(HTTP_STATUS.OK).json(eventsData);
// };
