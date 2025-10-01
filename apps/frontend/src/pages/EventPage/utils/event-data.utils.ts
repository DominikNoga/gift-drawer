import { get } from "@gd/shared/utils/api.utils";
import type { Event } from "@gd/types/src/models/events.model";

export const getEventData = async (eventId: string) => {
  try {
    const response = await get<Event>(`/events/${eventId}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};