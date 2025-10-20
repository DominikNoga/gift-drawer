import { toApiSchema, toDbSchema } from "../../utils/change-case.utils";
import { generateId } from "../../utils/generate-id.utils";
import { CreateExclusionFromEventRequest, CreateExclusionRequestDto, Exclusion, ExclusionDbRecord } from "@gd/types/src/models/exclusions.model";
import { createExclusionRecord } from "../exclusions/exclusions.utils";
import { createParticipantRecord } from "../participants/participant.utils";
import { CreateExclusionsFromParticipantDto, ParticipantDbRecord } from "@gd/types/src/models/participants.model";
import { EventDbRecord } from "@gd/types/src/models/events.model";
import { CreateEventRequest, CreateEventRequestWithoutRelations, GetEventResponse } from "@gd/types/src/api/api.events.types";
import { GetParticipantForEventResponse } from "@gd/types/src/api/api.participants.types";
import { participantsTable } from "../participants/participants.db";
import { exclusionsTable } from "../exclusions/exclusions.db";
import { DrawResultFailed, drawSecretSanta } from "../../utils/drawing-logic.utils";
import { Participant } from "@gd/types/src/models/participants.model";

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
  const createdParticipants: GetParticipantForEventResponse[] = [];
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
        drawnParticipantId: null,
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

const getMappedExclusions = (exclusions: ExclusionDbRecord[], participants: GetParticipantForEventResponse[]): GetEventResponse['exclusions'] => {
  return exclusions.map((ex) => {
    const { id, eventId, ...rest } = toApiSchema<ExclusionDbRecord>(ex);
    return rest;
  }).map((exclusion) => {
    const participant = participants.find(p => p.id === exclusion.participantId);
    const excludedParticipant = participants.find(p => p.id === exclusion.excludedParticipantId);
    return {
      ...exclusion,
      participantName: participant?.name || '',
      excludedParticipantName: excludedParticipant?.name || '',
    }
  });
};

export const getEventData = async (eventId: string, eventRow: EventDbRecord, joinCode: string): Promise<GetEventResponse> => {
  const participants = await participantsTable().where({ event_id: eventId });
  const exclusions = await exclusionsTable().where({ event_id: eventId });
  const mappedParticipants = participants.map((p) => {
    const { eventId, ...rest } = toApiSchema<ParticipantDbRecord>(p);
    return rest;
  });
  const mappedExclusions = getMappedExclusions(exclusions, mappedParticipants);

  return {
    ...toApiSchema<EventDbRecord>(eventRow),
    participants: mappedParticipants,
    currentParticipant: mappedParticipants.find(p => p.joinCode === joinCode)!,
    exclusions: mappedExclusions,
  };
};

export const validateDrawingPossibility = (request: CreateEventRequest): DrawResultFailed | { ok: true } => {
  const participants = request.participants.map((p, index) => ({ name: p.name, id: index.toString() }));
  const exclusions = request.exclusions.map((ex) => ({
    participantId: request.participants.findIndex(p => p.name === ex.participantName).toString(),
    excludedParticipantId: request.participants.findIndex(p => p.name === ex.excludedParticipantName).toString(),
  }));

  const result = drawSecretSanta(participants, exclusions);

  if (!result.ok) {
    return result;
  }

  return { ok: true };
};
