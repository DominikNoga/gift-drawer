import { useContext, useState, type FormEvent } from 'react';
import './AddParticipantsForm.scss';
import Input from '@gd/shared/components/Input/Input';
import { CreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import Button from '@gd/shared/components/buttons/Button/Button';
import ButtonWithIcon from '@gd/shared/components/buttons/ButtonWithIcon/ButtonWithIcon';
import { InterfaceIcons } from '@gd/shared/constants/icons';
import { validateParticipants } from './utils/AddParticipantsForm.utils';

const MIN_PARTICIPANTS = 3;
const INITIAL_PARTICIPANTS = ['', '', ''];

export default function AddParticipantsForm() {
  const { handleAddParticipants, createEventData, handleSetErrors } = useContext(CreateEventContext);
  const initialParticipants = createEventData.participants.length > 0 ? 
    createEventData.participants.map(participant => participant.name) : 
    INITIAL_PARTICIPANTS;
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

  const handleAddParticipant = (isAdding: boolean = false) => {
    if (isAdding) {
      setParticipants(prevParticipants => [...prevParticipants, '']);
      return;
    }
    setParticipants(prevParticipants => {
      if (prevParticipants.length > MIN_PARTICIPANTS) {
        return prevParticipants.slice(0, -1);
      }
      return prevParticipants;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    console.log(participants);
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
      <form onSubmit={handleSubmit} className='event-create-form'>
        <div className="event-create-form-buttons">
          <ButtonWithIcon
            type='button'
            className='remove-participant-btn'
            onClick={() => handleAddParticipant()}
            icon={<InterfaceIcons.Remove />}
            disabled={participants.length <= MIN_PARTICIPANTS}
          >
            Remove participant
          </ButtonWithIcon>
          <ButtonWithIcon
            type='button'
            className='add-participant-btn'
            onClick={() => handleAddParticipant(true)}
            icon={<InterfaceIcons.Create />}
          >
            Add participant
          </ButtonWithIcon>
        </div>
        {
          inputs.map((_, index) => (
            <Input
              key={`participant-input-${index}`}
              name={`participant-input-${index}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
              value={participants[index]}
              autoComplete='off'
              placeholder={`Set participant ${index + 1} name`}
              required
            />
          ))
        }
        <Button
          className='event-create-form-btn'
          btnType='primary'
          type='submit'
        >
          Next step
        </Button>
      </form>
    </>
  );
}
