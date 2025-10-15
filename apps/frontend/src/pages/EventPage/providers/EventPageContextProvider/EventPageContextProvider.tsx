import React, { useCallback, useContext, useEffect, useState } from "react";
import { EventPageContext, type EventPageContextType } from "./EventPageContext";
import { getEvent } from "@gd/shared/services/events-services/events.service";
import { cacheUserEvents } from "@gd/shared/services/events-services/events.cache.service";
import type { GetEventResponse } from "@gd/types/src/api/api.events.types";

type Props = {
  eventId: string;
  joinCode: string;
  children: React.ReactNode;
};

export default function EventPageContextProvider({ eventId, joinCode, children }: Props) {
  const [event, setEvent] = useState<GetEventResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const data = await getEvent(eventId!, joinCode!);
      cacheUserEvents(data);
      setEvent({
        ...data,
        namesDrawn:
          data.currentParticipant.drawnParticipantId !== undefined &&
          data.currentParticipant.drawnParticipantId !== null
      });
      setIsLoading(false);
      setIsOrganizer(data.currentParticipant.name === data.organizerName);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [eventId, joinCode]);

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]);

  const refetchEvent = () => {
    setReloadFlag(!reloadFlag);
  };

  return (
    <EventPageContext.Provider value={{ event, isOrganizer, isLoading, refetchEvent }}>
      {children}
    </EventPageContext.Provider>
  );
}

export function useEventPageContext(): EventPageContextType {
  const context = useContext(EventPageContext);

  if (!context) {
    throw new Error("useEventPageContext must be used within an EventPageContextProvider");
  }

  return context as EventPageContextType;
}
