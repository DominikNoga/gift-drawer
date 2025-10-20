
import { get, post } from "@gd/shared/utils/api.utils";
import type { CreateEventRequest, CreateEventResponse, EventIdResponse, GetEventResponse } from "@gd/types/src/api/api.events.types";
import type { DrawAssignmentsRequest } from "@gd/types/src/api/api.participants.types";
import axios from "axios";

const API_URL = '/events';

export const createEvent = async (formData: CreateEventRequest): Promise<CreateEventResponse> => {
  try {
    const { id, organizerCode } = await post<CreateEventResponse, CreateEventRequest>(API_URL, {
      ...formData,
    });
    return { id, organizerCode };

  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      const axiosError = err.response.data;
      throw new Error(axiosError.message || 'An unexpected error occurred. Please try again.');
    }
    console.error(err);
    throw err;
  }
};

export const getEvent = async (eventId: string, joinCode: string): Promise<GetEventResponse> => {
  try {
    const response = await get<GetEventResponse>(`${API_URL}/${eventId}/${joinCode}`);
    return response;
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

export const drawAssignments = async (eventId: string): Promise<void> => {
  try {
    await post<void, DrawAssignmentsRequest>(`${API_URL}/${eventId}/draw`, { eventId });
  } catch (err) {
    console.error(err);
    throw err;
  }
};