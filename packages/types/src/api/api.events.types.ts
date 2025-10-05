import { z } from 'zod';
import { EventCreateSchema } from '../models/events.model';

export type EventIdResponse = {
  id: string;
};

export type GetEventByJoinCodeRequest = { joinCode: string };

export type CreateEventRequest = z.infer<typeof EventCreateSchema>;
export type CreateEventRequestWithoutRelations = Omit<CreateEventRequest, 'participants' | 'exclusions'>;

export type CreateEventResponse = {
  id: string;
  organizerCode: string;
}
