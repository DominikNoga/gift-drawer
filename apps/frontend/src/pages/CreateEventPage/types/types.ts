import type { CreateEventRequestDto } from "@gd/types/src/models/events.model";
import type { CreateExclusionFromEventRequest } from "@gd/types/src/models/exclusions.model";
import type { FormEvent } from "react";

export type CurrentStep = 0 | 1 | 2 | 3;

export type ParticipantsCreateRequest = string[];

export type ExpectedFormData = CreateEventRequestDto | ParticipantsCreateRequest | CreateExclusionFromEventRequest;

export type CreateEventFormSubmitCallback<T extends ExpectedFormData> = (e: FormEvent, formData: T) => void;

export type EventCreateFormComponentProps<T extends ExpectedFormData> = {
  onSubmit: CreateEventFormSubmitCallback<T>;
};
