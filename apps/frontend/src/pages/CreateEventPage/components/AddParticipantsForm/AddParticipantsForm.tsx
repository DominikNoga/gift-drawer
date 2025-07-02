import { useState } from 'react';
import './AddParticipantsForm.scss';
import Input from '../Input/Input';

const INITIAL_QUANTITY = 3;

export default function AddParticipantsForm() {
  const [participants, setParticipants] = useState<string[]>(['', '', '']);
  const inputs = new Array(INITIAL_QUANTITY + participants.length + 1);
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
    </>
  );
}
