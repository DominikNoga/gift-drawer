import { DISPLAYED_ASSIGNMENT } from "../../constants/local-storage-keys";
import { cacheValue, getCachedValue } from "../local-storage.service";
import type { DisplayedAssignmentCache } from "./displayed-assignment.cache.service.types";

export const cacheDisplayedAssignment = (eventId: string, participantId: string) => {
  const displayedAssignments = getCachedValue<DisplayedAssignmentCache[]>(DISPLAYED_ASSIGNMENT);
  if (displayedAssignments) {
    const isEventAlreadyCached = displayedAssignments.some(
      (cache) => cache.eventId === eventId && cache.participantId === participantId
    );

    if (isEventAlreadyCached) {
      return;
    }
    
    const updatedCache = [...displayedAssignments, { eventId, participantId }];
    cacheValue<DisplayedAssignmentCache[]>(DISPLAYED_ASSIGNMENT, updatedCache);
    return;
  }

  cacheValue<DisplayedAssignmentCache[]>(DISPLAYED_ASSIGNMENT, [{ eventId, participantId }]);
};

export const getDisplayedAssignmentFromCache = (eventId: string, participantId: string): boolean => {
  const displayedAssignments = getCachedValue<DisplayedAssignmentCache[]>(DISPLAYED_ASSIGNMENT) || [];

  return displayedAssignments.some((cache) => cache.eventId === eventId && cache.participantId === participantId);
};