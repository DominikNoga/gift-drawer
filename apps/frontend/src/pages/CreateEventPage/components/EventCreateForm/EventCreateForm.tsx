import './EventCreateForm.scss';
import Card from '@gd/shared/components/Card/Card';
import { useCreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import BasicDataForm from '../BasicDataForm/BasicDataForm';
import AddParticipantsForm from '../AddParticipantsForm/AddParticipantsForm';
import SetExclusionsForm from '../SetExclusionsForm/SetExclusionsForm';
import CreateEventPreview from '../CreateEventPreview/CreateEventPreview';
import ErrorsList from '../ui/ErrorsList/ErrorsList';
import BackButton from '@gd/shared/components/buttons/BackButton/BackButton';

const Components = [
  BasicDataForm,
  AddParticipantsForm,
  SetExclusionsForm,
  CreateEventPreview,
];

export default function EventCreateForm() {
  const { currentStep, errors, handlePrevStep } = useCreateEventContext();
  const isBackDisabled = currentStep === 0;
  const Component = Components[currentStep];

  console.log(errors);

  return (
    <Card className='event-create-form-card'>
      <BackButton onClick={handlePrevStep} isDisabled={isBackDisabled} />
      <Component />
      {(errors && errors.length > 0) && <ErrorsList errors={errors} />}
    </Card>
  );
}
