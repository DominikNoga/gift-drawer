import { useContext, type FormEvent } from 'react';
import './CreateEventPreview.scss';
import { CreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import { createEvent } from '../../utils/data/event-data.utils';

export default function CreateEventPreview() {
  const { createEventData } = useContext(CreateEventContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createEvent(createEventData);
  };
  
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Review your event</h1>
      <button type='submit'>Create Event</button>
    </form>
  );
}
