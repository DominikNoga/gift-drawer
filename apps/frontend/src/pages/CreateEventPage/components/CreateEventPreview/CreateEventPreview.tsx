import { useContext, type FormEvent } from 'react';
import './CreateEventPreview.scss';
import { CreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import { createEvent } from '../../utils/data/event-data.utils';
import Button from '@gd/shared/components/buttons/Button/Button';

export default function CreateEventPreview() {
  const { createEventData } = useContext(CreateEventContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createEvent(createEventData);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Review your event</h1>
      <Button
        className='event-create-form-btn'
        btnType='primary'
        type='submit'
      >
          Create Event
      </Button>
    </form>
  );
}
