import { CREATE_EVENT_STEPS } from "../../constants/constants";
import type { CreateEventContextValues } from "./types/types";

export const INITIAL_CONTEXT_VALUE: CreateEventContextValues = {
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
  errors: [],
};
