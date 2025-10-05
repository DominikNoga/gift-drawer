import CircleIcon from '@gd/shared/components/icons/CircleIcon/CircleIcon';
import './EventCardsSection.scss';
import EventCard from './components/EventCard/EventCard';
import { createEventProps, joinEventProps } from './EventCardsSection.config';
import { UserIcons, InterfaceIcons } from '@gd/shared/constants/icons';
import Button from '@gd/shared/components/buttons/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES_NAMES } from '../../../../routes';
import Input from '@gd/shared/components/Input/Input';
import { joinEvent } from './EventCardsSection.utils';

export default function EventCardsSection() {
  const navigate = useNavigate();

  const handleJoinEvent = async () => {
    const joinCodeInput = document.getElementById('join-code-input') as HTMLInputElement;
    const joinCode = joinCodeInput.value;
    if (!joinCode) return;
    const eventId = await joinEvent(joinCode);
    if (eventId) {
      navigate(`${ROUTES_NAMES.EVENT}/${eventId}/${joinCode}`);
    }
  };

  return (
    <section className="event-cards-section">
      <EventCard
        icon={
          <CircleIcon
            icon={<InterfaceIcons.Create />}
            className='event-cards-create-icon'
          />
        }
        {...createEventProps}
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
        {...joinEventProps}
      >
        <Input
          id='join-code-input'
          className='input-field-green event-card-input'
          placeholder='Enter a join code'
        />
        <Button
          type="button"
          btnType="secondary"
          className="event-card-btn"
          onClick={handleJoinEvent}
        >
          Join Event
        </Button>
      </EventCard>
    </section>
  );
}
