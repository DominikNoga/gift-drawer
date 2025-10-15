export const MODAL_STATE = {
  IDLE: 'idle',
  DRAWING: 'drawing',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export type ModalState = typeof MODAL_STATE[keyof typeof MODAL_STATE];
