import './index.scss';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header/Header";
import Card from "@gd/shared/components/Card/Card";
import InfoCards from './components/InfoCards/InfoCards';
import MainSection from './components/MainSection/MainSection';
import { formatDate } from '@gd/shared/utils/date.utils';
import type { GetEventResponse } from '@gd/types/src/api/api.events.types';
import { getEvent } from '@gd/shared/services/events-services/events.service';
import { cacheUserEvents } from '@gd/shared/services/events-services/events.cache.service';

export default function EventPage() {
  const { eventId, joinCode } = useParams<{ eventId: string, joinCode: string }>();
  const [event, setEvent] = useState<GetEventResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvent(eventId!, joinCode!);
        cacheUserEvents(data);
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [eventId, joinCode]);

  return (
    <main className='event-page'>
      {event && (
        <>
          <Header event={event} />
          <Card>
            {
              event.description
            }
          </Card>
          <InfoCards 
            participantsQuantity={event.participants.length}
            assignedQuantity={0} //TODO: To be implemented
            eventDate={formatDate(event.exchangeDate) || 'Not set'}
          />
          <MainSection event={event} />
        </>

      )}
    </main>
  );
}
