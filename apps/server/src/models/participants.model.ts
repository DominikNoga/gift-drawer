import { z } from 'zod';
import { SnakeCaseKeys } from '../utils/type.utils';
import { TABLE_NAMES } from '../constants/table-names';
import { db } from '../db/db';

export const ParticipantSchema = z.object({
  id: z.string(),
  name: z.string(),
  password: z.string(),
  eventId: z.string()
});

export type Participant = z.infer<typeof ParticipantSchema>;
export type ParticipantDbRecord = SnakeCaseKeys<Participant>;

export const participantsTable = () => db<ParticipantDbRecord>(TABLE_NAMES.PARTICIPANTS);
