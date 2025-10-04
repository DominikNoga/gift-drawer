import { Request, Response } from 'express';
import { eventsTable } from './events.db';
import { CreateEventRequestDto, EventCreateSchema, EventDbRecord } from '@gd/types/src/models/events.model';
import { participantsTable } from '../participants/participants.db';
import { ParticipantDbRecord } from '@gd/types/src/models/participants.model';
import { exclusionsTable } from '../exclusions/exclusions.db';
import { ExclusionDbRecord } from '@gd/types/src/models/exclusions.model';
import { toApiSchema } from '../../utils/change-case.utils';
import { HTTP_STATUS } from '../../constants/status-codes';
import { createExclusions, createParticipants, getEventRow } from './events.utils';

export const getEventById = () => async (request: Request, response: Response) => {
  const { id } = request.params;
  const eventRow = await eventsTable().where({ id }).first();

  if (!eventRow) {
    return response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Event not found' });
  }

  const participants = await participantsTable().where({ event_id: id });
  const exclusions = await exclusionsTable().where({ event_id: id });

  const eventData = {
    ...toApiSchema<EventDbRecord>(eventRow),
    participants: participants.map(toApiSchema<ParticipantDbRecord>),
    exclusions: exclusions.map((ex) => {
      const { id, eventId, ...rest } = toApiSchema<ExclusionDbRecord>(ex);
      return rest;
    }),
  };

  return response.status(HTTP_STATUS.OK).json(eventData);
};

export const getAllEvents = () => async (request: Request, response: Response) => {
  const eventRows = await eventsTable().select();

  const eventsData = await Promise.all(eventRows.map(async (eventRow) => {
    const participants = await participantsTable().where({ event_id: eventRow.id });
    const exclusions = await exclusionsTable().where({ event_id: eventRow.id });

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

export const createEvent = () => async (request: Request<{}, {}, CreateEventRequestDto>, response: Response) => {
  console.log('Creating event with data:', request.body);
  const parseResult = EventCreateSchema.safeParse(request.body);

  if (!parseResult.success) {
    return response.status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: 'Invalid input', error: parseResult.error });
  }

  const input = parseResult.data;
  const { participants, exclusions, ...createEventRequest } = input;

  const dbData = getEventRow(createEventRequest);

  await eventsTable().insert(dbData);
  if (participants && participants.length) {
    const createdParticipants = await createParticipants(participants.map(p => p.name), dbData.id);

    if (exclusions && exclusions.length) {
      const exclusionsCreateResults = await createExclusions(exclusions, createdParticipants, dbData.id);
      if (typeof exclusionsCreateResults === 'string') {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
          message: exclusionsCreateResults
        });
      } 
    }
  }

  console.log(request.body);
  console.log(dbData);

  return response.status(HTTP_STATUS.CREATED).json({
    id: dbData.id,
  });
};
