export type GetParticipantForEventResponse = {
  id: string;
  name: string;
  joinCode: string;
};

export type DrawAssignmentsRequest = {
  eventId: string;
};
