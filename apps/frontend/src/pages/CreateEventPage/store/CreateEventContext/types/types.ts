import type { CreateEventRequest } from "@gd/types/src/api/api.events.types";
import type { CurrentStep } from "../../../types/types";
import type { CREATE_EVENT_ACTIONS } from "../../../constants/constants";
import type { CreateExclusionFromEventRequest } from "@gd/types/src/models/exclusions.model";
import type { FormEvent } from "react";

export type CreateEventActionType = 'basic-info' | 'add-participants' | 'set-exclusions' | 'create-event';

export type BasicInfoPayload = CreateEventRequest;

export type AddParticipantsPayload = string[];

export type NewExclusion = CreateExclusionFromEventRequest & { viceVersa: boolean };

export type SetExclusionsPayload = CreateExclusionFromEventRequest[];

export type CreateEventPayload = CreateEventRequest;

export type CreateEventAction = (
  { type: typeof CREATE_EVENT_ACTIONS['BASIC_INFO']; payload: BasicInfoPayload }
  | { type: typeof CREATE_EVENT_ACTIONS['ADD_PARTICIPANTS']; payload: AddParticipantsPayload }
  | { type: typeof CREATE_EVENT_ACTIONS['SET_EXCLUSIONS']; payload: SetExclusionsPayload }
  | { type: typeof CREATE_EVENT_ACTIONS['PREV_STEP']; }
  | { type: typeof CREATE_EVENT_ACTIONS['SET_ERRORS']; payload: string[] }
);

export type CreateEventContextType = {
  createEventData: CreateEventRequest;
  currentStep: CurrentStep;
  handleAddBasicData: (e: FormEvent, formData: BasicInfoPayload) => void,
  handleAddParticipants: (e: FormEvent, participants: AddParticipantsPayload) => void,
  handleAddExclusions: (e: FormEvent, exclusions: SetExclusionsPayload) => void,
  handlePrevStep: () => void;
  handleSetErrors: (errors: string[]) => void;
  errors?: string[];
};

export type CreateEventContextValues = Pick<CreateEventContextType, 'createEventData' | 'currentStep' | 'errors'>;
