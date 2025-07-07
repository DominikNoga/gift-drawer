import { CREATE_EVENT_STEPS } from "../../../constants/constants";
import type { CreateEventContextType } from "../types/types";

export const INITIAL_CREATE_EVENT_STATE: CreateEventContextType = {
  createEventData: {
    name: '',
    description: '',
    organizerName: '',
    giftBudget: undefined,
    location: '',
    exchangeDate: '',
    participants: [],
    exclusions: [],
  },
  currentStep: CREATE_EVENT_STEPS.BASIC_INFO,
};