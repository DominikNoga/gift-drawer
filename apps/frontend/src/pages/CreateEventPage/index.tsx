import './index.scss';
import EventCreateSteps from "./components/EventCreateSteps/EventCreateSteps";
import CreateEventContextProvider from './store/CreateEventContext/CreateEventContext';
import EventCreateForm from './components/EventCreateForm/EventCreateForm';

export default function CreateEventPage() {
  return (
    <CreateEventContextProvider>
      <main className="create-event-page-content">
        <EventCreateSteps />
        <EventCreateForm />
      </main>
    </CreateEventContextProvider>
  );
}
