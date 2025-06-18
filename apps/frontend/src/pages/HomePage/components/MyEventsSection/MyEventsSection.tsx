import { MOCK_EVENTS } from '@gd/shared/mock/mock-data';
import MyEventsList from './components/MyEventsList/MyEventsList';
import './MyEventsSection.scss';

export default function MyEventsSection() {
  return (
    <section className='my-events-section'>
      <h2 className='my-events-section-title'>My Events</h2>
      <MyEventsList events={MOCK_EVENTS}/>
    </section>
  );
}
