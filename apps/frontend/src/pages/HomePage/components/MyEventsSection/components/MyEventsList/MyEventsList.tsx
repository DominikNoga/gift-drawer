import type { Event } from '@gd/types/src/models/events.model';
import './MyEventsList.scss';
import MyEventsCard from '../MyEventsCard/MyEventsCard';

type MyEventsListProps = {
  events: Event[];
};

export default function MyEventsList({events = []}: MyEventsListProps) {
  return (
    <div>
      {
        events.length === 0 && <p>You do not have any events yet! Go ahead and create or join one!</p>
      }
      <ul className="my-events-list">
        {events.map((event) => (
          <MyEventsCard 
            key={event.id} 
            event={event} />
        ))}
      </ul>
    </div>
  );
}
