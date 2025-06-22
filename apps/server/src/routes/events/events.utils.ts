import { toDbSchema } from "../../utils/change-case.utils";
import { generateId } from "../../utils/generate-id.utils";
import { createParticipantRecord } from "../participants/participant.utils";
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
  const createdParticipants: {name: string, id: string}[] = [];
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
};
