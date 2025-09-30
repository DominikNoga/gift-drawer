import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventData } from "./utils/event-data.utils";

export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEventData(eventId!);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [eventId]);

  return (
    <div>Event Page: {eventId}</div>
  );
}
