import { ParticipantDbRecord } from '@gd/types/src/models/participants.model';
import { TABLE_NAMES } from '../../constants/table-names';
import { db } from '../../db/db';

export const participantsTable = () => db<ParticipantDbRecord>(TABLE_NAMES.PARTICIPANTS);
