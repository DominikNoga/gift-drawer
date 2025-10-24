import React, { useRef, useState, type FormEvent } from 'react';
import './AddParticipantsForm.scss';
import Input from '@gd/shared/components/Input/Input';
import { useCreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import Button from '@gd/shared/components/buttons/Button/Button';
import { validateParticipants } from './utils/AddParticipantsForm.utils';
import ErrorsList from '../ui/ErrorsList/ErrorsList';
import FormHeader from '../ui/FormHeader/FormHeader';

const MIN_PARTICIPANTS = 3;

export default function AddParticipantsForm() {
  const { handleAddParticipants, createEventData, handleSetErrors } = useCreateEventContext();
  const [participantsCount, setParticipantsCount] = useState<number>(
    createEventData.participants.length > 0 ? createEventData.participants.length : 1
  );
  const participantsCountRef = useRef<number>(participantsCount);
  const initialParticipants = createEventData.participants.length > 0 ?
    createEventData.participants.map(participant => participant.name) :
    [createEventData.organizerName];
  const [countError, setCountError] = useState<string | undefined>();
  const [participants, setParticipants] = useState<string[]>(initialParticipants);
  const inputs = participants.map((_, i) => i);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const name = event.target.value;
    setParticipants(prevParticipants => prevParticipants.map((participant, i) => {
      if (i === index) {
        participant = name;
      }
      return participant;
    }));
  };

  const handleSetParticipantsCount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    participantsCountRef.current = participantsCount;
    const count = participantsCountRef.current;
    if (count < MIN_PARTICIPANTS) {
      setCountError(`Please enter at least ${MIN_PARTICIPANTS} participants.`);
      return;
    }
    setCountError(undefined);
    if (count > participants.length) {
      const newParticipants = Array(count - participants.length).fill('');
      setParticipants(prevParticipants => [...prevParticipants, ...newParticipants]);
    } else {
      setParticipants(prevParticipants => prevParticipants.slice(0, count));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    const errors = validateParticipants(participants);
    if (errors.length > 0) {
      e.preventDefault();
      handleSetErrors(errors);
      return;
    }

    handleAddParticipants(e, participants);
  };

  return (
    <>
      <form className="event-create-form-participants-count" onSubmit={handleSetParticipantsCount}>
        <Input
          label='How many participants will there be? (including you)'
          id='participants-count'
          name='participants-count'
          min={3}
          type='number'
          required
          placeholder='Number of participants'
          value={participantsCount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const count = parseInt(e.target.value);
            setParticipantsCount(count);
          }}
        />
        <Button
          className='event-create-form-btn event-create-form-btn-confirm'
          btnType='primary'
          type='submit'
        >
          Confirm
        </Button>
      </form>
      {countError && <ErrorsList errors={[countError]} />}
      <form onSubmit={handleSubmit} className='event-create-form'>
        <FormHeader
          title='Participants names'
          subtitle={
            `Here you can add the names of all participants taking part in the event. You must add at least ${MIN_PARTICIPANTS} participants to proceed.`
          }
        />
        {
          inputs.map((_, index) => (
            <Input
              key={`participant-input-${index}`}
              name={`participant-input-${index}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
              value={participants[index]}
              autoComplete='off'
              placeholder={`Set participant ${index + 1} name`}
              disabled={index === 0}
              label={index === 0 ? 'Organizer (you)' : undefined}
              id={`participant-input-${index}`}
              required
            />
          ))
        }
        <Button
          className='event-create-form-btn'
          btnType='primary'
          type='submit'
          disabled={participantsCount < MIN_PARTICIPANTS}
        >
          Next step
        </Button>
      </form>
    </>
  );
}
