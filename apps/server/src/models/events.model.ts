import { z } from 'zod';
import { SnakeCaseKeys } from '../utils/type.utils';
import { Participant } from './participants.model';
import { Exclusion } from './exclusions.model';
import { db } from '../db/db';
import { TABLE_NAMES } from '../constants/table-names';

export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  organizerName: z.string(),
  giftBudget: z.number().nullable().optional(),
  location: z.string().nullable().optional(),
  exchangeDate: z.string().nullable().optional(),
  isReady: z.boolean(),
  joinCode: z.string().length(8),
  createdAt: z.string()
});

export type Event = z.infer<typeof EventSchema> & {
  participants: Participant[],
  exclusions: Omit<Exclusion, 'id' | 'eventId'>[]
};

export type CreateEventDto = Omit<Event, 'participants' | 'exclusions'>

export type EventDbRecord = SnakeCaseKeys<Event>;

export const eventsTable = () => db<EventDbRecord>(TABLE_NAMES.EVENTS);
