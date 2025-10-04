import { z } from 'zod';
import { type SnakeCaseKeys } from '../utils/types.utils';

export const ParticipantSchema = z.object({
  id: z.string(),
  name: z.string(),
  password: z.string().nullable(),
  eventId: z.string()
});

export const ParticipantCreateSchema = ParticipantSchema.pick({
  name: true,
  eventId: true,
})

export type Participant = z.infer<typeof ParticipantSchema>;
export type ParticipantUI = Pick<Participant, 'name' | 'id'>;
export type CreateParticipantRequestDto = z.infer<typeof ParticipantCreateSchema>;
export type ParticipantDbRecord = SnakeCaseKeys<Participant>;
export type CreateExclusionsFromParticipantDto = Pick<Participant, 'id' | 'name'>;
