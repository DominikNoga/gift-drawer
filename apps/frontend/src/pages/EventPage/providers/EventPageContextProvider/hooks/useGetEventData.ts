import { cacheUserEvents } from "@gd/shared/services/events-services/events.cache.service";
import { getEvent } from "@gd/shared/services/events-services/events.service";
import type { GetEventResponse } from "@gd/types/src/api/api.events.types";
import { useEffect, useState } from "react";

export function useGetEventData(eventId: string, joinCode: string) {
  const [event, setEvent] = useState<GetEventResponse>();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvent(eventId, joinCode);
        cacheUserEvents(data);
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [eventId, joinCode]);

  return event;
}