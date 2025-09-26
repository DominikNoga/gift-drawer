import { useParams } from "react-router-dom";

export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  return (
    <div>Event Page: {eventId}</div>
  );
}
