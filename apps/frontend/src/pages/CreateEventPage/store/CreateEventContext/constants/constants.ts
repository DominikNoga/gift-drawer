import type { FormEvent } from "react";
import { CREATE_EVENT_STEPS } from "../../../constants/constants";
import type { AddParticipantsPayload, BasicInfoPayload, CreateEventContextType, SetExclusionsPayload } from "../types/types";

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
  handleAddBasicData: (e: FormEvent, formData: BasicInfoPayload) => { },
  handleAddParticipants: (e: FormEvent, participants: AddParticipantsPayload) => { },
  handleAddExclusions: (e: FormEvent, exclusions: SetExclusionsPayload) => { },
  handlePrevStep: () => { },
  handleSetErrors: (errors: string[]) => { },
  errors: [],
};