import './SetExclusionsForm.scss';
import { useState, type FormEvent } from "react";
import { useCreateEventContext } from "../../store/CreateEventContext/CreateEventContext";
import type { NewExclusion } from "../../store/CreateEventContext/types/types";
import Button from "@gd/shared/components/buttons/Button/Button";
import CreateExclusionRow from './components/CreateExclusionRow/CreateExclusionRow';
import { InterfaceIcons } from '@gd/shared/constants/icons';
import { getInitialExclusions, getMappedExclusionsWithViceVersa, getValidExclusions } from './utils/SetExclusionsForm.utils';
import { EMPTY_EXCLUSION } from './constants/constants';
import FormHeader from '../ui/FormHeader/FormHeader';

export default function SetExclusionsForm() {
  const { handleAddExclusions, createEventData } = useCreateEventContext();
  const [exclusions, setExclusions] = useState<NewExclusion[]>(getInitialExclusions(createEventData.exclusions));
  const participants = createEventData.participants.map(p => p.name) || [];

  const addMoreExclusions = () => {
    setExclusions(prevExclusions => [...prevExclusions, {...EMPTY_EXCLUSION}]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number, input: 0 | 1) => {
    const { value } = e.target;
    setExclusions(prevExclusions => {
      const newExclusions = [...prevExclusions];
      if (input === 0) {
        newExclusions[index].participantName = value;
      } else if (input === 1) {
        newExclusions[index].excludedParticipantName = value;
      }
      return newExclusions;
    });
  };

  const handleViceVersaChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const isChecked = e.target.checked;
    setExclusions(prevExclusions => {
      const newExclusions = [...prevExclusions];
      newExclusions[index].viceVersa = isChecked;
      return newExclusions;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    const validExclusions = getValidExclusions(exclusions);
    const mappedExclusions = getMappedExclusionsWithViceVersa(validExclusions);
    console.log(mappedExclusions);
    handleAddExclusions(e, mappedExclusions);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='event-create-form'>
      <FormHeader
        title='Set Exclusions'
        subtitle='Here you can define participants that cannot draw each other'
      />

      {
        exclusions.map((exclusion, index) => (
          <CreateExclusionRow
            key={Math.random().toString(36).substring(2, 15) + index}
            participants={participants}
            index={index}
            values={[exclusion.participantName, exclusion.excludedParticipantName]}
            handleChange={handleChange}
            handleViceVersaChange={handleViceVersaChange}
            isViceVersaChecked={exclusion.viceVersa}
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
