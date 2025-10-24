import { useState, type FormEvent } from 'react';
import './CreateEventPreview.scss';
import { useCreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import { clearFormDataCache } from '../../utils/create-event.utils';
import { createEvent } from '@gd/shared/services/events-services/events.service';
import Button from '@gd/shared/components/buttons/Button/Button';
import BasicInfoSection from './BasicInfoSection/BasicInfoSection';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import ExclusionsSection from './ExclusionsSection/ExclusionsSection';
import { useNavigate } from 'react-router-dom';
import FormHeader from '../ui/FormHeader/FormHeader';

export default function CreateEventPreview() {
  const { createEventData, handleSetErrors } = useCreateEventContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { id, organizerCode } = await createEvent(createEventData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      clearFormDataCache();
      navigate(`/event/${id}/${organizerCode}`);
    } catch (err) {
      console.error(err);
      const error = err as Error;
      setIsSubmitting(false);
      handleSetErrors([error.message || 'An unexpected error occurred. Please try again.']);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='create-event-preview-form'>
      <FormHeader
        title="Review your event" 
        subtitle="Please review the details of your event before creating it. You can go back to make any changes if needed."
      />
      <div className='create-event-preview-form-content'>
        <BasicInfoSection {...createEventData} />
        <ParticipantsSection participants={createEventData.participants} />
        <ExclusionsSection exclusions={createEventData.exclusions} />
      </div>
      <Button
        className='event-create-form-btn'
        btnType='primary'
        type='submit'
      >
        { isSubmitting ? 'Creating Event...' : 'Create Event'}
      </Button>
    </form>
  );
}
