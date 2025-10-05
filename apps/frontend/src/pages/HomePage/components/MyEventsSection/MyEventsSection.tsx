import { getUserEventsFromCache } from '@gd/shared/services/events-services/events.cache.service';
import MyEventsList from './components/MyEventsList/MyEventsList';
import './MyEventsSection.scss';
import { NavigationIcons } from '@gd/shared/constants/icons';

export default function MyEventsSection() {
  const events = getUserEventsFromCache();

  return (
    <section className='my-events-section'>
      <span className='my-events-section-title'>
        <NavigationIcons.Search className='my-events-section-title-icon' /> My Events
      </span>
      <MyEventsList events={events || []} />
    </section>
  );
}
