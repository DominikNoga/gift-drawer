import { post } from "@gd/shared/utils/api.utils";
import type { CreateEventDto, CreateEventRequestDto } from "@gd/types/src/models/events.model";
import { CREATE_EVENT_FORM_VALUE_KEY } from "../../constants/constants";
import { INITIAL_CREATE_EVENT_STATE } from "../../store/CreateEventContext/constants/constants";
import type { CreateEventContextType } from "../../store/CreateEventContext/types/types";

export const createEvent = async (formData: CreateEventRequestDto): Promise<{ id: string }> => {
  try {
    const { id } = await post<{id: string}, CreateEventRequestDto>('/events', {
      ...formData,
    });
    return { id };

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getInitialFormValue = (): CreateEventContextType => {
  const cachedData = localStorage.getItem(CREATE_EVENT_FORM_VALUE_KEY);
  return cachedData && cachedData !== '' ? 
    JSON.parse(cachedData) : INITIAL_CREATE_EVENT_STATE;
};

export const cacheFormValue = (formState: CreateEventContextType): void => {
  localStorage.setItem(CREATE_EVENT_FORM_VALUE_KEY, JSON.stringify(formState));
};

export const clearFormDataCache = (): void => {
  localStorage.removeItem(CREATE_EVENT_FORM_VALUE_KEY);
};
