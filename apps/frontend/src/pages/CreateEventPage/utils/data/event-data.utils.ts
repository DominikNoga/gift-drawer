import { post } from "@gd/shared/utils/api.utils";
import type { CreateEventDto, CreateEventRequestDto } from "@gd/types/src/models/events.model";
import type { CreateExclusionFromEventRequest } from "@gd/types/src/models/exclusions.model";

export const createEvent = async (
  formData: CreateEventDto,
  participants: string[],
  exclusions: CreateExclusionFromEventRequest[]
) => {
  try {
    await post<CreateEventDto, CreateEventRequestDto>('/events', {
      ...formData,
      participants: participants.map(name => ({ name })),
      exclusions: exclusions,
    });

  } catch (err) {
    console.error(err);
  }
};
