import Card from '@gd/shared/components/Card/Card';
import { useContext } from 'react';
import { CreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import BasicDataForm from '../BasicDataForm/BasicDataForm';
import AddParticipantsForm from '../AddParticipantsForm/AddParticipantsForm';
import SetExclusionsForm from '../SetExclusionsForm/SetExclusionsForm';
import CreateEventPreview from '../CreateEventPreview/CreateEventPreview';

const Components = [
  BasicDataForm,
  AddParticipantsForm,
  SetExclusionsForm,
  CreateEventPreview,
];

export default function EventCreateForm() {
  const { currentStep } = useContext(CreateEventContext);
  const Component = Components[currentStep];

  return (
    <Card className='event-create-form-card'>
      <Component />
    </Card>
  );
}
