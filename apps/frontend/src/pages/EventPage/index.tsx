import './index.scss';
import { useParams } from "react-router-dom";
import EventPageContextProvider from './providers/EventPageContextProvider/EventPageContextProvider';
import EventPageContent from './EventPageContent';

export default function EventPage() {
  const { eventId, joinCode } = useParams<{ eventId: string, joinCode: string }>();

  return (
    <EventPageContextProvider eventId={eventId!} joinCode={joinCode!}>
      <EventPageContent />
    </EventPageContextProvider>
  );
}
