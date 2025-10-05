import { getEventIdByJoinCode } from "@gd/shared/services/events-services/events.service";

export const createEvent = () => {

};

export const joinEvent = async (joinCode: string) => {
  try {
    const eventId = await getEventIdByJoinCode(joinCode);
    return eventId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};