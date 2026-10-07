import { getUserEventsFromCache } from '@gd/shared/services/events-services/events.cache.service';
import MyEventsList from './components/MyEventsList/MyEventsList';
import { NavigationIcons } from '@gd/shared/constants/icons';
import MainPageSection from '../MainPageSection/MainPageSection';

export default function MyEventsSection() {
  const events = getUserEventsFromCache();

  return (
    <MainPageSection
      title={
        <>
          <NavigationIcons.Search className="main-page-section-title-icon" /> My Events
        </>
      }
    >
      <MyEventsList events={events || []} />
    </MainPageSection>
  );
}
