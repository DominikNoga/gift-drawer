export const isDateInput = (inputType: string | undefined) => 
  inputType && 
  (inputType === 'datetime-local' || inputType === 'date');
