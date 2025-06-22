import { db } from '../../db/db';
import { TABLE_NAMES } from '../../constants/table-names';
import { EventDbRecord } from '@gd/types/src/models/events.model';

export const eventsTable = () => db<EventDbRecord>(TABLE_NAMES.EVENTS);
