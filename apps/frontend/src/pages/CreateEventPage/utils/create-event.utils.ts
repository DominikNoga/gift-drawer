import { CREATE_EVENT_FORM_VALUE_KEY } from "../constants/constants";
import { INITIAL_CONTEXT_VALUE } from "../store/CreateEventContext/CreateEventContext.const";
import type { CreateEventContextValues } from "../store/CreateEventContext/types/types";

export const getInitialFormValue = (): CreateEventContextValues | undefined => {
  const cachedData = localStorage.getItem(CREATE_EVENT_FORM_VALUE_KEY);
  return cachedData && cachedData !== '' ? 
    JSON.parse(cachedData) : INITIAL_CONTEXT_VALUE;
};

export const cacheFormValue = (formState: CreateEventContextValues): void => {
  localStorage.setItem(CREATE_EVENT_FORM_VALUE_KEY, JSON.stringify(formState));
};

export const clearFormDataCache = (): void => {
  localStorage.removeItem(CREATE_EVENT_FORM_VALUE_KEY);
};
