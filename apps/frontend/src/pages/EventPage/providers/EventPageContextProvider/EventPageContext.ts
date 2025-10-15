import type { GetEventResponse } from "@gd/types/src/api/api.events.types";
import { createContext } from "react";

export type EventPageContextType = {
  event: GetEventResponse;
  isOrganizer: boolean;
  isLoading: boolean;
  refetchEvent: () => void;
};

export const EventPageContext = createContext<Partial<EventPageContextType> | undefined>(undefined);
