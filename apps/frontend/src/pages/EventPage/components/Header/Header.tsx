import './Header.scss';
import BackButton from '@gd/shared/components/buttons/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import { useEventPageContext } from '../../providers/EventPageContextProvider/EventPageContextProvider';

export default function Header() {
  const { event } = useEventPageContext();
  const navigate = useNavigate();

  const onBackClick = () => {
    navigate('/');
  };

  return (
    <header className='event-page-header'>
      <BackButton onClick={onBackClick} isDisabled={false} filled />
      <main>
        <span className='event-page-header-title'>Hello {event.currentParticipant.name} 👋</span>
        <h4>Welcome to {event.name}</h4>
      </main>
      <div className={`event-page-header-phase ${event.namesDrawn ? 'names-drawn' : ''}`}>
        {event.namesDrawn ? 'Names drawn' : 'Setup in progress'}
      </div>
    </header>
  );
}
