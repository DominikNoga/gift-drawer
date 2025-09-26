import type { SetExclusionsPayload } from "../../../store/CreateEventContext/types/types";

export const getValidExclusions = (exclusions: SetExclusionsPayload): SetExclusionsPayload => {
  return exclusions.filter(exclusion => 
    exclusion.participantName && exclusion.excludedParticipantName &&
    (exclusion.participantName !== '' && exclusion.excludedParticipantName !== '') &&
    exclusion.participantName !== exclusion.excludedParticipantName
  );
};
