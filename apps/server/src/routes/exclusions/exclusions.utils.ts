import { toDbSchema } from "../../utils/change-case.utils";
import { generateId } from "../../utils/generate-id.utils";
import { CreateExclusionRequestDto, ExclusionDbRecord, exclusionsTable } from "./exclusions.model";

export const getExclusionRow = (createExclusionRequest: CreateExclusionRequestDto): ExclusionDbRecord => {
  const id = generateId();

  return toDbSchema({
    ...createExclusionRequest,
    id,
  });
};

export const createExclusionRecord = async (createExclusionRequest: CreateExclusionRequestDto) => {
  const exclusionRow = getExclusionRow(createExclusionRequest);
  await exclusionsTable().insert(exclusionRow);
  return exclusionRow.id;
};
