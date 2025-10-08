import { CreateWishlistItemRequest } from "@gd/types/src/api/api.wishes.types";
import { toDbSchema } from "../../utils/change-case.utils";
import { generateId } from "../../utils/generate-id.utils";
import { wishesTable } from "./wishes.db";
import { WishlistItemDbRecord } from "@gd/types/src/models/wish.model";

export const getWishlistItemRow = (createWishlistItemRequest: CreateWishlistItemRequest): WishlistItemDbRecord => {
  const id = generateId();

  return toDbSchema({
    ...createWishlistItemRequest,
    id,
  });
};

export const createWishlistItemRecord = async (createWishlistItemRequest: CreateWishlistItemRequest) => {
  const wishlistItemRow = getWishlistItemRow(createWishlistItemRequest);
  await wishesTable().insert(wishlistItemRow);
  return {
    id: wishlistItemRow.id,
  };
};
