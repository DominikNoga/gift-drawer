export type GetParticipantForEventResponse = {
  id: string;
  name: string;
  joinCode: string;
  drawnParticipantId: string | null;
};

export type DrawAssignmentsRequest = {
  eventId: string;
};
