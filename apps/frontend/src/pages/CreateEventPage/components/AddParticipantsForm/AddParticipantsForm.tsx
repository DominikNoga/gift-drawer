import { useState, type FormEvent } from 'react';
import './AddParticipantsForm.scss';
import Input from '../Input/Input';
import type { EventCreateFormComponentProps, ParticipantsCreateRequest } from '../../types/types';
import Card from '@gd/shared/components/Card/Card';

const INITIAL_QUANTITY = 3;

export default function AddParticipantsForm({ onSubmit }: EventCreateFormComponentProps<ParticipantsCreateRequest>) {
  const [participants, setParticipants] = useState<string[]>(['', '', '']);
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

  return (
    <>
      <form onSubmit={(e: FormEvent) => onSubmit(e, participants)}>
        {
          inputs.map((_, index) => (
            <Input
              key={`participant-input-${index}`}
              name={`participant-input-${index}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
              value={participants[index]}
              autoComplete='off'
              placeholder={`Set participant ${index + 1} name`}
            />
          ))
        }
      </form>
    </>
  );
}
