import type { NewExclusion, SetExclusionsPayload } from "../../../store/CreateEventContext/types/types";
import { EMPTY_EXCLUSION } from "../constants/constants";

export const getValidExclusions = (exclusions: NewExclusion[]): NewExclusion[] => {
  return exclusions.filter(exclusion => 
    exclusion.participantName && exclusion.excludedParticipantName &&
    (exclusion.participantName !== '' && exclusion.excludedParticipantName !== '') &&
    exclusion.participantName !== exclusion.excludedParticipantName
  );
};

export const getInitialExclusions = (existingExclusions?: SetExclusionsPayload): NewExclusion[] => {
  return (existingExclusions && existingExclusions.length) ? existingExclusions?.map(exclusion => ({ ...exclusion, viceVersa: false })) 
    : [{...EMPTY_EXCLUSION}];
};

export const getMappedExclusionsWithViceVersa = (exclusions: NewExclusion[]): SetExclusionsPayload => {
  const viceVersaExclusions = exclusions
    .filter(exclusion => exclusion.viceVersa)
    .map(exclusion => ({
      participantName: exclusion.excludedParticipantName,
      excludedParticipantName: exclusion.participantName,
    }));

  return [
    ...exclusions.map(({ excludedParticipantName, participantName }) => ({ excludedParticipantName, participantName })),
    ...viceVersaExclusions
  ];
};