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

export const CREATE_EVENT_ACTIONS = {
  BASIC_INFO: 'basic-info',
  ADD_PARTICIPANTS: 'add-participants',
  SET_EXCLUSIONS: 'set-exclusions',
} as const;

export const CREATE_EVENT_STEPS = {
  BASIC_INFO: 0,
  ADD_PARTICIPANTS: 1,
  SET_EXCLUSIONS: 2,
  PREVIEW: 3,
} as const; 
