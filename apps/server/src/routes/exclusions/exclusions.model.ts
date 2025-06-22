import { z } from "zod";
import { SnakeCaseKeys } from "../../utils/type.utils";
import { db } from "../../db/db";
import { TABLE_NAMES } from "../../constants/table-names";

export const ExclusionSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  participantId: z.string(),
  excludedParticipantId: z.string()
});

export const CreateExclusionSchema = ExclusionSchema.omit({
  id: true,
});

export type Exclusion = z.infer<typeof ExclusionSchema>;
export type CreateExclusionRequestDto = z.infer<typeof CreateExclusionSchema>;
export type CreateExclusionFromEventRequest = {
  participantName: string;
  excludedParticipantName: string;
};

export type ExclusionDbRecord = SnakeCaseKeys<Exclusion>;

export const exclusionsTable = () => db<ExclusionDbRecord>(TABLE_NAMES.EXCLUSIONS);
