import { Request, Response } from 'express';
import { CreateEventDto, Event, EventDbRecord, eventsTable } from '../models/events.model';
import { ParticipantDbRecord, participantsTable } from '../models/participants.model';
import { ExclusionDbRecord, exclusionsTable } from '../models/exclusions.model';
import { EventSchema } from '../models/events.model';
import { toApiSchema, toDbSchema } from '../utils/change-case.utils';
import { z } from 'zod';
import crypto from 'node:crypto';
import { generateId } from '../utils/generate-id.utils';

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


export const createEvent = () => async (request: Request, response: Response) => {
  const parseResult = EventSchema.omit({ id: true, createdAt: true }).safeParse(request.body);

  if (!parseResult.success) {
    return response.status(400).json({ message: 'Invalid input', error: parseResult.error });
  }

  const input = parseResult.data;
  const id = generateId();
  const createdAt = new Date().toISOString();

  const dbData = toDbSchema<CreateEventDto>({ ...input, id, createdAt });

  await eventsTable().insert(dbData);

  return response.status(201).json({
    ...input,
    id,
    createdAt,
    participants: [],
    exclusions: []
  });
};
