import { CREATE_EVENT_ACTIONS, CREATE_EVENT_STEPS } from "../../../../constants/constants";
import type { CreateEventAction, CreateEventContextType } from "../../types/types";

export const createEventReducer = (state: CreateEventContextType, action: CreateEventAction) => {
  let updatedState = { ...state };

  switch (action.type) {
    case CREATE_EVENT_ACTIONS.BASIC_INFO:
      updatedState = {
        ...state,
        createEventData: { ...action.payload },
        currentStep: CREATE_EVENT_STEPS.ADD_PARTICIPANTS,
      };
      break;
    case CREATE_EVENT_ACTIONS.ADD_PARTICIPANTS:
      updatedState = {
        ...state,
        currentStep: CREATE_EVENT_STEPS.SET_EXCLUSIONS,
        createEventData: {
          ...state.createEventData,
          participants: action.payload.map(name => ({name})),
        },
      };
      break;
    case CREATE_EVENT_ACTIONS.SET_EXCLUSIONS:
      updatedState = {
        ...state,
        currentStep: CREATE_EVENT_STEPS.PREVIEW,
        createEventData: {
          ...state.createEventData,
          exclusions: action.payload,
        },
      };
      break;
    default:
      throw new Error(`No such action type ${action}`);
  }

  return updatedState;
};
