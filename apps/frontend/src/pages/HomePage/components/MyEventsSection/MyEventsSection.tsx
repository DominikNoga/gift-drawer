import { MOCK_EVENTS } from '@gd/shared/mock/mock-data';
import MyEventsList from './components/MyEventsList/MyEventsList';
import './MyEventsSection.scss';
import { NavigationIcons } from '@gd/shared/constants/icons';

export default function MyEventsSection() {
  return (
    <section className='my-events-section'>
      <span className='my-events-section-title'>
        <NavigationIcons.Search className='my-events-section-title-icon' /> My Events
      </span>
      <MyEventsList events={MOCK_EVENTS}/>
    </section>
  );
}
