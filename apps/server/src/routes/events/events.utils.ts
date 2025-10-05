import { toApiSchema, toDbSchema } from "../../utils/change-case.utils";
import { generateId } from "../../utils/generate-id.utils";
import { CreateExclusionFromEventRequest, CreateExclusionRequestDto, ExclusionDbRecord } from "@gd/types/src/models/exclusions.model";
import { createExclusionRecord } from "../exclusions/exclusions.utils";
import { createParticipantRecord } from "../participants/participant.utils";
import { CreateExclusionsFromParticipantDto, ParticipantDbRecord, ParticipantUI } from "@gd/types/src/models/participants.model";
import { EventDbRecord } from "@gd/types/src/models/events.model";
import { CreateEventRequestWithoutRelations } from "@gd/types/src/api/api.events.types";
import { participantsTable } from "../participants/participants.db";
import { exclusionsTable } from "../exclusions/exclusions.db";

export const getEventRow = (createEventRequest: CreateEventRequestWithoutRelations): EventDbRecord => {
  const id = generateId();
  const createdAt = new Date().toISOString();

  return toDbSchema({
    ...createEventRequest,
    id,
    createdAt,
    isReady: false,
  });
};

export const createParticipants = async (participantsNames: string[], eventId: string) => {
  const createdParticipants: ParticipantUI[] = [];
  for (const participantName of participantsNames) {
    try {
      const { id: participantId, joinCode } = await createParticipantRecord({
        name: participantName,
        eventId,
      });
      createdParticipants.push({
        name: participantName,
        id: participantId,
        joinCode,
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

export const getEventData = async (eventId: string, eventRow: EventDbRecord) => {
  const participants = await participantsTable().where({ event_id: eventId });
  const exclusions = await exclusionsTable().where({ event_id: eventId });

  return {
    ...toApiSchema<EventDbRecord>(eventRow),
    participants: participants.map(toApiSchema<ParticipantDbRecord>),
    exclusions: exclusions.map((ex) => {
      const { id, eventId, ...rest } = toApiSchema<ExclusionDbRecord>(ex);
      return rest;
    }),
  };
};