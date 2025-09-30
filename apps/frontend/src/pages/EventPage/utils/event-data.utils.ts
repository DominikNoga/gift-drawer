import { get } from "@gd/shared/utils/api.utils";

export const getEventData = async (eventId: string) => {
  try {
    const response = await get(`/events/${eventId}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};