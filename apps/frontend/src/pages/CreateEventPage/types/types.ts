import type { CreateEventRequest } from "@gd/types/src/api/api.events.types";
import type { CreateExclusionFromEventRequest } from "@gd/types/src/models/exclusions.model";
import type { FormEvent } from "react";

export type CurrentStep = 0 | 1 | 2 | 3;

export type ParticipantsCreateRequest = string[];

export type ExpectedFormData = CreateEventRequest | ParticipantsCreateRequest | CreateExclusionFromEventRequest;

export type CreateEventFormSubmitCallback<T extends ExpectedFormData> = (e: FormEvent, formData: T) => void;

export type EventCreateFormComponentProps<T extends ExpectedFormData> = {
  onSubmit: CreateEventFormSubmitCallback<T>;
};
