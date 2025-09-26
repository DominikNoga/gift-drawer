export const CREATE_EVENT_ACTIONS = {
  BASIC_INFO: 'basic-info',
  ADD_PARTICIPANTS: 'add-participants',
  SET_EXCLUSIONS: 'set-exclusions',
  PREV_STEP: 'prev-step',
  SET_ERRORS: 'set-errors',
} as const;

export const CREATE_EVENT_STEPS = {
  BASIC_INFO: 0,
  ADD_PARTICIPANTS: 1,
  SET_EXCLUSIONS: 2,
  PREVIEW: 3,
} as const; 

export const CREATE_EVENT_FORM_VALUE_KEY = 'create-event-form-value';