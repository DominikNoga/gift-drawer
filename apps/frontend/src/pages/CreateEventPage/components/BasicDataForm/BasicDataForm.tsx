import './BasicDataForm.scss';
import { useState, type FormEvent } from 'react';
import type { CreateEventRequest } from '@gd/types/src/api/api.events.types';
import Button from '@gd/shared/components/buttons/Button/Button';
import Input from '@gd/shared/components/Input/Input';
import { InterfaceIcons, UserIcons } from '@gd/shared/constants/icons';
import { useCreateEventContext } from '../../store/CreateEventContext/CreateEventContext';
import FormHeader from '../ui/FormHeader/FormHeader';


export default function BasicDataForm() {
  const { handleAddBasicData, createEventData } = useCreateEventContext();
  const [form, setForm] = useState<CreateEventRequest>(createEventData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'giftBudget' ? parseInt(value) : value,
    }));
  };

  return (
    <form onSubmit={(e: FormEvent) => handleAddBasicData(e, form)} className='event-create-form'>
      <FormHeader
        title='Basic information'
        subtitle='Provide the basic details about your event'
      />
      
      <Input
        label='Event name'
        id='name'
        name='name'
        onChange={handleChange}
        value={form.name}
        autoComplete='off'
        placeholder='Give some awesome name to your event'
        required
      />
      <Input
        label='Description'
        id='description'
        name='description'
        isTextarea={true}
        value={form.description}
        onChange={handleChange}
        icon={<InterfaceIcons.Description />}
        placeholder='Tell the participants more about the upcoming event'
        required
      />
      <Input
        label='Organizer Name'
        id='organizerName'
        name='organizerName'
        icon={<UserIcons.User />}
        value={form.organizerName}
        onChange={handleChange}
        placeholder='What is your name?'
        required
      />
      <Input
        label='Location'
        id='location'
        name='location'
        value={form.location}
        icon={<InterfaceIcons.World />}
        onChange={handleChange}
        placeholder='Where is it taking place?'
        required
      />
      <div className="input-row">
        <Input
          label='Gift Budget'
          id='giftBudget'
          name='giftBudget'
          type='number'
          value={form.giftBudget}
          icon={<InterfaceIcons.Money />}
          onChange={handleChange}
          placeholder='How much paricipants can spend on the gift?'
        />
        <Input
          label='Exchange Date'
          id='exchangeDate'
          name='exchangeDate'
          type='datetime-local'
          value={form.exchangeDate}
          icon={<InterfaceIcons.Calendar />}
          onChange={handleChange}
          placeholder='When is the gift exchange?'
          required
        />
      </div>
      <Button
        className='event-create-form-btn'
        btnType='primary'
        type='submit'>
        Next step
      </Button>
    </form>
  );
}
