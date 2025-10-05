import { toDbSchema } from "../../utils/change-case.utils";
import { generateId } from "../../utils/generate-id.utils";
import { CreateParticipantRequestDto, ParticipantDbRecord } from "@gd/types/src/models/participants.model";
import { participantsTable } from "./participants.db";
import crypto from 'crypto';

function generateJoinCode() {
  return crypto.randomBytes(16).toString('base64url'); 
}

export const getParticipantRow = (createParticipantRequest: CreateParticipantRequestDto): ParticipantDbRecord => {
  const id = generateId();

  return toDbSchema({
    ...createParticipantRequest,
    id,
    joinCode: generateJoinCode(),
  });
};

export const createParticipantRecord = async (createParticipantRequest: CreateParticipantRequestDto) => {
  const participantRow = getParticipantRow(createParticipantRequest);
  await participantsTable().insert(participantRow);
  return {
    id: participantRow.id,
    joinCode: participantRow.join_code,
  };
};
