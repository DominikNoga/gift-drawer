import './index.scss';
import EventCreateForm from "./components/EventCreateForm/EventCreateForm";
import EventCreateSteps from "./components/EventCreateSteps/EventCreateSteps";

export default function CreateEventPage() {
  return (
    <>
      <main className="create-event-page-content">
        <EventCreateSteps />
        <EventCreateForm />
      </main>
    </>
  );
}
