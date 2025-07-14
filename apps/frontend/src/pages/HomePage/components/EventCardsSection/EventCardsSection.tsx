import CircleIcon from '@gd/shared/components/icons/CircleIcon/CircleIcon';
import './EventCardsSection.scss';
import EventCard from './components/EventCard/EventCard';
import { createEventProps, joinEventProps } from './EventCardsSection.config';
import { NavigationIcons, UserIcons } from '@gd/shared/constants/icons';
import Button from '@gd/shared/components/buttons/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES_NAMES } from '../../../../routes';

export default function EventCardsSection() {
  const navigate = useNavigate();

  return (
    <section className="event-cards-section">
      <EventCard
        icon={
          <CircleIcon 
            icon={<NavigationIcons.Create />}
            className='event-cards-create-icon'
          />
        }
        { ...createEventProps }
      >
        <Button 
          type="button"
          onClick={() => {
            navigate(ROUTES_NAMES.CREATE_EVENT);
          }}
          btnType="primary" 
          className="event-card-btn">
          Create Event
        </Button>
      </EventCard>
      <EventCard
        icon={
          <CircleIcon 
            icon={<UserIcons.Users />}
            className='event-cards-join-icon' 
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
