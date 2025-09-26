import './BackButton.scss';
import { useContext } from 'react';
import { CreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import { NavigationIcons } from '@gd/shared/constants/icons';

export default function BackButton() {
  const { currentStep, handlePrevStep } = useContext(CreateEventContext);
  const isDisabled = currentStep === 0;
  
  return (
    <button
      className={`event-create-form-back-btn${isDisabled ? '-disabled' : ''}`}
      type='button'
      onClick={handlePrevStep}
      disabled={isDisabled}
    >
      <NavigationIcons.Back className='event-create-form-back-btn-icon'/>
    </button>
  );
}
