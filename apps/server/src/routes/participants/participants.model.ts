import { z } from 'zod';
import { SnakeCaseKeys } from '../../utils/type.utils';
import { TABLE_NAMES } from '../../constants/table-names';
import { db } from '../../db/db';

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
export type CreateParticipantRequestDto = z.infer<typeof ParticipantCreateSchema>;
export type ParticipantDbRecord = SnakeCaseKeys<Participant>;

export const participantsTable = () => db<ParticipantDbRecord>(TABLE_NAMES.PARTICIPANTS);
