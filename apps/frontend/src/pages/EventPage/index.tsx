import './index.scss';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventData } from "./utils/event-data.utils";
import Header from "./components/Header/Header";
import type { Event } from "@gd/types/src/models/events.model";
import Card from "@gd/shared/components/Card/Card";
import InfoCards from './components/InfoCards/InfoCards';

export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEventData(eventId!);
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [eventId]);

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
            assignedQuantity={0} // To be implemented
            joinCode={event.joinCode}
          />
        </>

      )}
    </main>
  );
}
