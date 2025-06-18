import CircleIcon from '@gd/shared/components/icons/CircleIcon/CircleIcon';
import './EventCardsSection.scss';
import EventCard from '../EventCard/EventCard';
import { createEventProps, joinEventProps } from './EventCardsSection.config';
import { NavigationIcons, UserIcons } from '@gd/shared/constants/icons';
import Button from '@gd/shared/components/Button/Button';

export default function EventCardsSection() {
  return (
    <section className="event-cards-section">
      <EventCard
        icon={
          <CircleIcon 
            icon={<NavigationIcons.Create />} 
            backgroundColor="#fee2e2" 
            iconColor="#dc2626" 
          />
        }
        { ...createEventProps }
      >
        <Button 
          type="button" 
          btnType="primary" 
          className="event-card-btn">
          Create Event
        </Button>
      </EventCard>
      <EventCard
        icon={
          <CircleIcon 
            icon={<UserIcons.Users />} 
            backgroundColor="#dcfce7" 
            iconColor="#16a34a" 
          />
        }
        { ...joinEventProps }
      >
        <Button 
          type="button" 
          btnType="secondary" 
          className="event-card-btn">
          Join Event
        </Button>
      </EventCard>
    </section>
  );
}
