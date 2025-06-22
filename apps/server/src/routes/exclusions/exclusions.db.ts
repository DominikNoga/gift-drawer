import { db } from "../../db/db";
import { TABLE_NAMES } from "../../constants/table-names";
import { ExclusionDbRecord } from '@gd/types/src/models/exclusions.model';

export const exclusionsTable = () => db<ExclusionDbRecord>(TABLE_NAMES.EXCLUSIONS);
