import { z } from 'zod';
import { SnakeCaseKeys } from '../../utils/type.utils';
import { Participant, ParticipantSchema } from '../participants/participants.model';
import { Exclusion, ExclusionSchema } from '../exclusions/exclusions.model';
import { db } from '../../db/db';
import { TABLE_NAMES } from '../../constants/table-names';

export const EventSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  description: z.string().max(250),
  organizerName: z.string().max(30),
  giftBudget: z.number()
    .min(1)
    .int()
    .optional(),
  location: z.string()
    .optional(),
  exchangeDate: z.string()
    .optional(),
  isReady: z.boolean(),
  joinCode: z.string().length(8),
  createdAt: z.string(),
  participants: z.array(ParticipantSchema.pick({name: true})),
  exclusions: z.array(z.object({
    participantName: z.string(),
    excludedParticipantName: z.string(),
  })),
});

export const EventCreateSchema = EventSchema.omit({
  createdAt: true,
  id: true,
  joinCode: true,
  isReady: true,
});

export const EventDbSchema = EventSchema.omit({
  exclusions: true,
  participants: true,
})

export type Event = z.infer<typeof EventSchema>;

export type CreateEventRequestDto = z.infer<typeof EventCreateSchema>;
export type CreateEventRequestWithoutRelations = Omit<CreateEventRequestDto, 'participants' | 'exclusions'>;
export type CreateEventDto = Omit<Event, 'participants' | 'exclusions'>;

export type EventDbRecord = SnakeCaseKeys<z.infer<typeof EventDbSchema>>;

export const eventsTable = () => db<EventDbRecord>(TABLE_NAMES.EVENTS);
