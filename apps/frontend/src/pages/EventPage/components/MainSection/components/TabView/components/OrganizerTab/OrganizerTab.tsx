import { drawAssignments } from '@gd/shared/services/events-services/events.service';
import './OrganizerTab.scss';

export default function OrganizerTab({ eventId }: { eventId: string }) {
  const onDrawAssignments = async () => {
    try {
      const result = await drawAssignments(eventId);
      console.log(result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error drawing assignments:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h1>Organizer Section</h1>
      <button className="draw-assignments-button" onClick={onDrawAssignments}>
        Draw Assignments
      </button>
    </div>
  );
}
