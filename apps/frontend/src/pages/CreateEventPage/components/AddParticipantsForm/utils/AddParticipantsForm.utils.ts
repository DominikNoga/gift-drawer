const allNamesDifferent = (participants: string[]) => {
  const participantsSet = new Set(participants);
  return participantsSet.size === participants.length;
};

const allNamesFilled = (participants: string[]) => {
  const emptyParticipant = participants.find(p => p === '');
  console.log(emptyParticipant);
  return emptyParticipant === undefined;
};

export const validateParticipants = (participants: string[]): string[] => {
  const errors: string[] = [];

  if (!allNamesFilled(participants)) {
    errors.push('Participant names cannot be empty');
  }
  
  if (!allNamesDifferent(participants)) {
    errors.push('All names must have different values');
  }

  return errors;
};
