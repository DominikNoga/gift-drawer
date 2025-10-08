import { db } from '../../db/db';
import { TABLE_NAMES } from '../../constants/table-names';
import { WishlistItemDbRecord } from '@gd/types/src/models/wish.model';

export const wishesTable = () => db<WishlistItemDbRecord>(TABLE_NAMES.WISHES);
