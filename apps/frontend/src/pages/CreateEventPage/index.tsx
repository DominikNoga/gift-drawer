import './index.scss';
import EventCreateSteps from "./components/ui/EventCreateSteps/EventCreateSteps";
import CreateEventContextProvider from './store/CreateEventContext/CreateEventContext';
import EventCreateForm from './components/EventCreateForm/EventCreateForm';
import BackButton from '@gd/shared/components/buttons/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';

export default function CreateEventPage() {
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate('/');
  };

  return (
    <CreateEventContextProvider>
      <BackButton onClick={onBackClick} isDisabled={false} />
      <main className="create-event-page-content">
        <EventCreateSteps />
        <EventCreateForm />
      </main>
    </CreateEventContextProvider>
  );
}
