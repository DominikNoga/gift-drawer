import { toDbSchema } from "../../utils/change-case.utils";
import { generateId } from "../../utils/generate-id.utils";
import { CreateExclusionFromEventRequest, CreateExclusionRequestDto } from "../exclusions/exclusions.model";
import { createExclusionRecord } from "../exclusions/exclusions.utils";
import { createParticipantRecord } from "../participants/participant.utils";
import { CreateExclusionsFromParticipantDto, Participant } from "../participants/participants.model";
import { CreateEventRequestWithoutRelations, EventDbRecord } from "./events.model";

const generateJoinCode = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  return code;
};

export const getEventRow = (createEventRequest: CreateEventRequestWithoutRelations): EventDbRecord => {
  const id = generateId();
  const createdAt = new Date().toISOString();
  const joinCode = generateJoinCode();

  return toDbSchema({
    ...createEventRequest,
    id,
    createdAt,
    isReady: false,
    joinCode,
  });
};

export const createParticipants = async (participantsNames: string[], eventId: string) => {
  const createdParticipants: CreateExclusionsFromParticipantDto[] = [];
  for (const participantName of participantsNames) {
    try {
      const participantId = await createParticipantRecord({
        name: participantName,
        eventId,
      });
      createdParticipants.push({
        name: participantName,
        id: participantId,
      })
    } catch (error) {
      console.error(error);
    }
  }
  return createdParticipants;
};

const mapToExclusionRequest = (
  exclusions: CreateExclusionFromEventRequest[], 
  createdParticipants: CreateExclusionsFromParticipantDto[],
  eventId: string
): CreateExclusionRequestDto[] | string => {
  let isError = false;
  const mappedExclusions = exclusions.map(exclusion => {
    const { excludedParticipantName, participantName } = exclusion;
    const excludedParticipantId = createdParticipants
      .find(p => p.name === excludedParticipantName)?.id;
    const participantId = createdParticipants
      .find(p => p.name === participantName)?.id;;

    if (excludedParticipantId && participantId) {
      return {
        eventId,
        excludedParticipantId,
        participantId 
      };
    }
    isError = true;
  });
  return !isError ? 
    (mappedExclusions as CreateExclusionRequestDto[]) : 
    'There was an error when creating exclusions'; 
};

export const createExclusions = async (
  exclusions: CreateExclusionFromEventRequest[], 
  createdParticipants: CreateExclusionsFromParticipantDto[], 
  eventId: string
) => {
  const exclusionsCreateRequests = mapToExclusionRequest(exclusions, createdParticipants, eventId);
  if (typeof exclusionsCreateRequests !== 'string') {
    for (const exclusionCreateRequest of exclusionsCreateRequests) {
      await createExclusionRecord(exclusionCreateRequest);
    }
    return;
  }
  return exclusionsCreateRequests;
};
