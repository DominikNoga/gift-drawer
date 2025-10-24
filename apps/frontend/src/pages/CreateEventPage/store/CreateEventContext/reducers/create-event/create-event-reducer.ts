import { CREATE_EVENT_ACTIONS, CREATE_EVENT_STEPS } from "../../../../constants/constants";
import type { CurrentStep } from "../../../../types/types";
import { cacheFormValue } from "../../../../utils/create-event.utils";
import type { CreateEventAction, CreateEventContextValues } from "../../types/types";

export const createEventReducer = (state: CreateEventContextValues | undefined, action: CreateEventAction) => {
  let updatedState = { 
    ...state,
    errors: [],
  } as CreateEventContextValues;
  console.log(updatedState);

  switch (action.type) {
    case CREATE_EVENT_ACTIONS.BASIC_INFO:
      updatedState = {
        ...updatedState,
        createEventData: { ...action.payload },
        currentStep: CREATE_EVENT_STEPS.ADD_PARTICIPANTS,
      };
      break;
    case CREATE_EVENT_ACTIONS.ADD_PARTICIPANTS:
      updatedState = {
        ...updatedState,
        currentStep: CREATE_EVENT_STEPS.SET_EXCLUSIONS,
        createEventData: {
          ...updatedState.createEventData,
          participants: action.payload.map(name => ({ name })),
        },
      };
      break;
    case CREATE_EVENT_ACTIONS.SET_EXCLUSIONS:
      updatedState = {
        ...updatedState,
        currentStep: CREATE_EVENT_STEPS.PREVIEW,
        createEventData: {
          ...updatedState.createEventData,
          exclusions: action.payload,
        },
      };
      break;
    case CREATE_EVENT_ACTIONS.PREV_STEP:
      updatedState = {
        ...updatedState,
        currentStep: updatedState.currentStep > 0 ?
          (updatedState.currentStep - 1) as CurrentStep : 0,
      };
      break;
    case CREATE_EVENT_ACTIONS.SET_ERRORS:
      updatedState = {
        ...updatedState,
        errors: action.payload,
      };
      break;
    default:
      throw new Error(`No such action type ${action}`);
  }

  cacheFormValue(updatedState);

  return updatedState;
};
