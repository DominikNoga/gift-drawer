import { z } from 'zod';
import type { SnakeCaseKeys } from '../utils/types.utils';
import { ParticipantSchema } from './participants.model';

export const EventSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  description: z.string(),
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
  createdAt: z.string(),
  participants: z.array(ParticipantSchema.pick({name: true, id: true, joinCode: true})),
  exclusions: z.array(z.object({
    participantName: z.string(),
    excludedParticipantName: z.string(),
  })),
});

export const EventCreateSchema = EventSchema.omit({
  createdAt: true,
  id: true,
  isReady: true,
}).extend({
  participants: z.array(ParticipantSchema.pick({ name: true })),
});

export const EventDbSchema = EventSchema.omit({
  exclusions: true,
  participants: true,
})

export type Event = z.infer<typeof EventSchema>;

export type EventDbRecord = SnakeCaseKeys<z.infer<typeof EventDbSchema>>;
