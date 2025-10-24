import { CREATE_EVENT_FORM_VALUE_KEY } from "../constants/constants";
import type { CreateEventContextType } from "../store/CreateEventContext/types/types";

export const getInitialFormValue = (): CreateEventContextType | undefined => {
  const cachedData = localStorage.getItem(CREATE_EVENT_FORM_VALUE_KEY);
  return cachedData && cachedData !== '' ? 
    JSON.parse(cachedData) : undefined;
};

export const cacheFormValue = (formState: CreateEventContextType): void => {
  localStorage.setItem(CREATE_EVENT_FORM_VALUE_KEY, JSON.stringify(formState));
};

export const clearFormDataCache = (): void => {
  localStorage.removeItem(CREATE_EVENT_FORM_VALUE_KEY);
};
