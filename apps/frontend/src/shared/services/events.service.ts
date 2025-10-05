
import { get, post } from "@gd/shared/utils/api.utils";
import type { CreateEventRequest, CreateEventResponse, EventIdResponse } from "@gd/types/src/api/api.events.types";

const API_URL = '/events';

export const createEvent = async (formData: CreateEventRequest): Promise<CreateEventResponse> => {
  try {
    const { id, organizerCode } = await post<CreateEventResponse, CreateEventRequest>(API_URL, {
      ...formData,
    });
    return { id, organizerCode };

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getEventIdByJoinCode = async (joinCode: string): Promise<string> => {
  try {
    const { id } = await get<EventIdResponse>(`${API_URL}/join/${joinCode}`);
    return id;
  } catch (err) {
    console.error(err);
    throw err;
  }
};