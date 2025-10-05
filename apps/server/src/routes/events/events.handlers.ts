import { Request, Response } from 'express';
import { eventsTable } from './events.db';
import { EventCreateSchema, EventDbRecord } from '@gd/types/src/models/events.model';
import { EventIdResponse, GetEventByJoinCodeRequest, CreateEventResponse, CreateEventRequest } from '@gd/types/src/api/api.events.types';
import { ApiResponse } from '@gd/types/src/api/api.types';
import { participantsTable } from '../participants/participants.db';
import { ParticipantDbRecord } from '@gd/types/src/models/participants.model';
import { exclusionsTable } from '../exclusions/exclusions.db';
import { ExclusionDbRecord } from '@gd/types/src/models/exclusions.model';
import { toApiSchema } from '../../utils/change-case.utils';
import { HTTP_STATUS } from '../../constants/status-codes';
import { createExclusions, createParticipants, getEventData, getEventRow } from './events.utils';

export const getEventById = () => async (request: Request, response: Response) => {
  const { id } = request.params;
  const eventRow = await eventsTable()
    .where({ id })
    .first();

  if (!eventRow) {
    return response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Event not found' });
  }

  const eventData = await getEventData(id, eventRow);

  return response.status(HTTP_STATUS.OK).json(eventData);
};

export const getAllEvents = () => async (request: Request, response: Response) => {
  const eventRows = await eventsTable().select();

  const eventsData = await Promise.all(eventRows.map(async (eventRow) => {
    const participants = await participantsTable()
      .where({ event_id: eventRow.id });
    const exclusions = await exclusionsTable()
      .where({ event_id: eventRow.id });

    return {
      ...toApiSchema<EventDbRecord>(eventRow),
      participants: participants.map(toApiSchema<ParticipantDbRecord>),
      exclusions: exclusions.map((ex) => {
        const { id, eventId, ...rest } = toApiSchema<ExclusionDbRecord>(ex);
        return rest;
      }),
    };
  }));

  return response.status(HTTP_STATUS.OK).json(eventsData);
}

export const createEvent = () => async (request: Request<{}, {}, CreateEventRequest>, response: Response<ApiResponse<CreateEventResponse>>) => {
  const parseResult = EventCreateSchema.safeParse(request.body);

  if (!parseResult.success) {
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

export const getEventIdByParticipantCode = () => async (request: Request<GetEventByJoinCodeRequest>, response: Response<ApiResponse<EventIdResponse>>) => {
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
