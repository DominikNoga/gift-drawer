import type { CreateEventRequestDto } from "@gd/types/src/models/events.model";

export const INITIAL_CREATE_EVENT_FORM_STATE: CreateEventRequestDto = {
  name: '',
  description: '',
  organizerName: '',
  giftBudget: undefined,
  location: '',
  exchangeDate: '',
  participants: [],
  exclusions: [],
};
