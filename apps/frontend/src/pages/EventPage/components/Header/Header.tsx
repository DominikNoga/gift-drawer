import type { Event } from '@gd/types/src/models/events.model';
import './Header.scss';
import BackButton from '@gd/shared/components/buttons/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@gd/shared/utils/date.utils';

type Props = {
  event: Event
};

export default function Header({ event }: Props) {
  const navigate = useNavigate();
  
  const onBackClick = () => {
    navigate('/');
  };

  return (
    <header className='event-page-header'>
      <BackButton onClick={onBackClick} isDisabled={false} filled />
      <main>
        <span className='event-page-header-title'>{event.name}</span>
        <section className='event-page-header-details'>
          <p>
            Organized by {event.organizerName}
          </p>
          <p>
            Exchange Date: {formatDate(event.exchangeDate)}
          </p>
          <p>
            Budget: ${event.giftBudget || 'not set'}
          </p>
        </section>
      </main>
      <div className='event-page-header-phase'>
        { event.isReady ? 'Ready for draw' : 'Setup in progress' }
      </div>
    </header>
  );
}
