import { getDisplayedAssignmentFromCache } from "@gd/shared/services/displayed-assignment/displayed-assignment.cache.service";
import { ASSIGNMENT_STATES, type AssignmentState } from "./YourAssignmentTab.const";

export const getAssignmentTabState = (eventId: string, participantId: string, assignment?: string): AssignmentState => {
  if (!assignment) {
    return ASSIGNMENT_STATES.NO_ASSIGNMENT;
  }
  const displayedAssignment = getDisplayedAssignmentFromCache(eventId, participantId);
  if (displayedAssignment) {
    return ASSIGNMENT_STATES.ASSIGNMENT_REVEALED;
  }
  return ASSIGNMENT_STATES.ASSIGNMENT_HIDDEN;
};