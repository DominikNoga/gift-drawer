import './MyEventsCard.scss';
import Card from '@gd/shared/components/Card/Card';
import { ChristmasIcons, InterfaceIcons, NavigationIcons, UserIcons } from '@gd/shared/constants/icons';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@gd/shared/utils/date.utils';
import type { CachedEvent } from '@gd/shared/types/events.types';

type Props = {
  event: CachedEvent;
};

export default function MyEventsCard({ event }: Props) {
  const navigate = useNavigate();

  function handleCardClick() {
    navigate(`/event/${event.id}/${event.participantJoinCode}`);
  }

  return (
    <Card className='my-events-card' onClick={handleCardClick}>
      <div className="my-events-card-row">
        <h3>{event.name}</h3>
        <NavigationIcons.ExternalLink className='my-events-card-row-link-icon' />
      </div>
      <section className='my-events-card-info'>
        <span className='my-events-card-info-item'>
          <UserIcons.User className='my-events-card-info-icon-green' />
          {event.participantsCount} Participants
        </span>
        <span className='my-events-card-info-item'>
          <InterfaceIcons.Calendar className='my-events-card-info-icon-blue' />
          {formatDate(event.exchangeDate)}
        </span>
        <span className='my-events-card-info-item'>
          <ChristmasIcons.Gift className='my-events-card-info-icon-purple' />
          ${event.giftBudget} budget
        </span>
      </section>
      <footer className='my-events-card-footer'>
        <div className="row">
          <span>
            {
              formatDate(event.createdAt)
            }
          </span>
        </div>
      </footer>
    </Card>
  );
}
