import './SetExclusionsForm.scss';
import { useContext, useState, type FormEvent } from "react";
import { CreateEventContext } from "../../store/CreateEventContext/CreateEventContext";
import type { SetExclusionsPayload } from "../../store/CreateEventContext/types/types";
import Button from "@gd/shared/components/buttons/Button/Button";
import CreateExclusionRow from './components/CreateExclusionRow/CreateExclusionRow';
import { InterfaceIcons } from '@gd/shared/constants/icons';
import { getValidExclusions } from './utils/SetExclusionsForm.utils';

const EMPTY_EXCLUSION = {
  participantName: '',
  excludedParticipantName: '',
};

export default function SetExclusionsForm() {
  const { handleAddExclusions, createEventData } = useContext(CreateEventContext);
  const [exclusions, setExclusions] = useState<SetExclusionsPayload>(createEventData.exclusions || [EMPTY_EXCLUSION]);
  const participants = createEventData.participants.map(p => p.name) || [];

  const addMoreExclusions = () => {
    setExclusions(prevExclusions => [...prevExclusions, EMPTY_EXCLUSION]);
  };

  const handleSubmit = (e: FormEvent) => {
    const validExclusions = getValidExclusions(exclusions);
    console.log(validExclusions);
    debugger;
    handleAddExclusions(e, validExclusions);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='event-create-form'>
      <header>
        <h2>Set Exclusions</h2>
        <p>Here you can define participants that cannot draw each other</p>
      </header>

      {
        exclusions.map((exclusion, index) => (
          <CreateExclusionRow
            key={`${exclusion.participantName}-${exclusion.excludedParticipantName}`}
            participants={participants}
            index={index}
            values={[exclusion.participantName, exclusion.excludedParticipantName]}
          />
        ))
      }

      <button
        className='set-exclusions-add-more-btn'
        onClick={addMoreExclusions}
        type='button'
      >
        <InterfaceIcons.Create />
        Add exclusion
      </button>

      <Button
        className='event-create-form-btn'
        btnType='primary'
        type='submit'
      >
        Next step
      </Button>
    </form>
  );
}
