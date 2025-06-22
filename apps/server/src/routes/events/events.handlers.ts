import { Request, Response } from 'express';
import { CreateEventRequestDto, EventCreateSchema, EventDbRecord, eventsTable } from './events.model';
import { ParticipantDbRecord, participantsTable } from '../participants/participants.model';
import { ExclusionDbRecord, exclusionsTable } from '../exclusions/exclusions.model';
import { toApiSchema } from '../../utils/change-case.utils';
import { HTTP_STATUS } from '../../constants/status-codes';
import { createParticipants, getEventRow } from './events.utils';

export const getEventById = () => async (request: Request, response: Response) => {
  const { id } = request.body;

  const eventRow = await eventsTable().where({ id }).first();

  if (!eventRow) {
    return response.status(404).json({ message: 'Event not found' });
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

  return response.status(200).json(eventData);
};


export const createEvent = () => async (request: Request<{}, {}, CreateEventRequestDto>, response: Response) => {
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
      
    }
  }



  return response.status(201).json({
    id: dbData.id,
  });
};
