import { z } from 'zod';
import { EventCreateSchema, type Event } from '../models/events.model';
import { type GetParticipantForEventResponse } from './api.participants.types';

export type EventIdResponse = {
  id: string;
};

// POST: /events
export type CreateEventRequest = z.infer<typeof EventCreateSchema>;
export type CreateEventRequestWithoutRelations = Omit<CreateEventRequest, 'participants' | 'exclusions'>;

export type CreateEventResponse = {
  id: string;
  organizerCode: string;
};

// GET: /events/join/:joinCode
export type GetEventByJoinCodeRequest = { joinCode: string };

// GET: /events/:id/:joinCode
export type GetEventRequest = {
  id: string;
  joinCode: string;
};

export type GetEventResponse = Event & {
  currentParticipant: GetParticipantForEventResponse;
  namesDrawn?: boolean;
};

