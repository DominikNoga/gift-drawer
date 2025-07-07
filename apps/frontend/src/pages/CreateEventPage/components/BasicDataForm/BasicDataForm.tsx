import './BasicDataForm.scss';
import { useContext, useState, type FormEvent } from 'react';
import type { CreateEventRequestDto } from '@gd/types/src/models/events.model';
import Button from '@gd/shared/components/Button/Button';
import Input from '../Input/Input';
import { InterfaceIcons, UserIcons } from '@gd/shared/constants/icons';
import { INITIAL_CREATE_EVENT_FORM_STATE } from '../../constants/constants';
import { CreateEventContext } from '../../store/CreateEventContext/CreateEventContext';


export default function BasicDataForm() {
  const { handleAddBasicData } = useContext(CreateEventContext);
  const [form, setForm] = useState<CreateEventRequestDto>(INITIAL_CREATE_EVENT_FORM_STATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'giftBudget' ? parseInt(value) : value,
    }));
  };

  return (
    <form onSubmit={(e: FormEvent) => handleAddBasicData(e, form)} className='event-create-form'>
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
        />
      </div>
      <Button
        className='event-create-form-btn'
        btnType='primary'
        type='submit'>
        Create Event
      </Button>
    </form>
  );
}
