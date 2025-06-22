// import { toDbSchema } from "../../utils/change-case.utils";
// import { generateId } from "../../utils/generate-id.utils";
// import { CreateParticipantRequestDto, ParticipantDbRecord, participantsTable } from "./participants.model";

// export const getParticipantRow = (createParticipantRequest: CreateParticipantRequestDto): ParticipantDbRecord => {
//   const id = generateId();

//   return toDbSchema({
//     ...createParticipantRequest,
//     id,
//     password: null,
//   });
// };

// export const createParticipantRecord = async (createParticipantRequest: CreateParticipantRequestDto) => {
//   const participantRow = getParticipantRow(createParticipantRequest);
//   await participantsTable().insert(participantRow);
//   return participantRow.id;
// };
