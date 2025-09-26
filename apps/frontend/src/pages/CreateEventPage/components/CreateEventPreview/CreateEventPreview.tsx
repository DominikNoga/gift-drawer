import { useContext, type FormEvent } from 'react';
import './CreateEventPreview.scss';
import { CreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import { clearFormDataCache, createEvent } from '../../utils/data/event-data.utils';
import Button from '@gd/shared/components/buttons/Button/Button';
import BasicInfoSection from './BasicInfoSection/BasicInfoSection';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import ExclusionsSection from './ExclusionsSection/ExclusionsSection';
import { useNavigate } from 'react-router-dom';

export default function CreateEventPreview() {
  const { createEventData } = useContext(CreateEventContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { id } = await createEvent(createEventData);
      clearFormDataCache();
      navigate(`/event/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Review your event</h1>
      <div className='event-preview'>
        <BasicInfoSection {...createEventData} />
        <ParticipantsSection participants={createEventData.participants} />
        <ExclusionsSection exclusions={createEventData.exclusions} />
      </div>
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
