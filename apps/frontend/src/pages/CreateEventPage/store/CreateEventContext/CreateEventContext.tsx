import React, { useReducer, type FormEvent } from "react";
import { createContext } from "react";
import type { AddParticipantsPayload, BasicInfoPayload, CreateEventContextType, SetExclusionsPayload } from "./types/types";
import { createEventReducer } from "./reducers/create-event/create-event-reducer";
import { INITIAL_CREATE_EVENT_STATE } from "./constants/constants";
import { CREATE_EVENT_ACTIONS } from "../../constants/constants";
import { getInitialFormValue } from "../../utils/data/event-data.utils";

export const CreateEventContext = createContext<CreateEventContextType>(INITIAL_CREATE_EVENT_STATE);

export default function CreateEventContextProvider({ children }: { children: React.ReactNode }) {
  const [createEventState, createEventDispatch] = useReducer(createEventReducer, getInitialFormValue());

  const handleAddBasicData = (e: FormEvent, formData: BasicInfoPayload) => {
    e.preventDefault();
    createEventDispatch({
      payload: formData,
      type: CREATE_EVENT_ACTIONS.BASIC_INFO
    });
  };

  const handleAddParticipants = (e: FormEvent, participants: AddParticipantsPayload) => {
    e.preventDefault();
    createEventDispatch({
      payload: participants,
      type: CREATE_EVENT_ACTIONS.ADD_PARTICIPANTS,
    });
  };

  const handleAddExclusions = (e: FormEvent, exclusions: SetExclusionsPayload) => {
    e.preventDefault();
    createEventDispatch({
      payload: exclusions,
      type: CREATE_EVENT_ACTIONS.SET_EXCLUSIONS,
    });
  };

  const handlePrevStep = () => {
    createEventDispatch({
      type: CREATE_EVENT_ACTIONS.PREV_STEP,
    });
  };

  const handleSetErrors = (errors: string[]) => {
    createEventDispatch({
      payload: errors,
      type: CREATE_EVENT_ACTIONS.SET_ERRORS,
    });
  };

  const ctxValue = {
    ...createEventState,
    handleAddExclusions,
    handleAddParticipants,
    handleAddBasicData,
    handlePrevStep,
    handleSetErrors,
  };

  return (
    <CreateEventContext value={ctxValue}>
      {children}
    </CreateEventContext>
  );
}
