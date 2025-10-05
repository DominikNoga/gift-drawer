import MyEventsList from './components/MyEventsList/MyEventsList';
import useUserEvents from './hooks/useUserEvents';
import './MyEventsSection.scss';
import { NavigationIcons } from '@gd/shared/constants/icons';

export default function MyEventsSection() {
  const { events, error } = useUserEvents();
  return (
    <section className='my-events-section'>
      <span className='my-events-section-title'>
        <NavigationIcons.Search className='my-events-section-title-icon' /> My Events
      </span>
      { error && <p className='my-events-section-error'>{ error }</p> }
      <MyEventsList events={[]} />
    </section>
  );
}
