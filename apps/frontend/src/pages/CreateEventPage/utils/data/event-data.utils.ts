import { post } from "@gd/shared/utils/api.utils";
import type { CreateEventDto, CreateEventRequestDto } from "@gd/types/src/models/events.model";

export const createEvent = async (formData: CreateEventRequestDto) => {
  try {
    await post<CreateEventDto, CreateEventRequestDto>('/events', {
      ...formData,
    });

  } catch (err) {
    console.error(err);
  }
};
