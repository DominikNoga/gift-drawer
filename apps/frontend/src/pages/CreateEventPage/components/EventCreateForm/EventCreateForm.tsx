import './EventCreateForm.scss';
import Card from '@gd/shared/components/Card/Card';
import { useContext } from 'react';
import { CreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import BasicDataForm from '../BasicDataForm/BasicDataForm';
import AddParticipantsForm from '../AddParticipantsForm/AddParticipantsForm';
import SetExclusionsForm from '../SetExclusionsForm/SetExclusionsForm';
import CreateEventPreview from '../CreateEventPreview/CreateEventPreview';
import BackButton from '../BackButton/BackButton';
import ErrorsList from '../ErrorsList/ErrorsList';

const Components = [
  BasicDataForm,
  AddParticipantsForm,
  SetExclusionsForm,
  CreateEventPreview,
];

export default function EventCreateForm() {
  const { currentStep, errors } = useContext(CreateEventContext);
  const Component = Components[currentStep];

  console.log(errors);

  return (
    <Card className='event-create-form-card'>
      <BackButton />
      <Component />
      {(errors && errors.length > 0) && <ErrorsList errors={errors} />}
    </Card>
  );
}
