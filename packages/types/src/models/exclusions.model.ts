import { z } from "zod";
import { type SnakeCaseKeys } from "../utils/types.utils";

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
