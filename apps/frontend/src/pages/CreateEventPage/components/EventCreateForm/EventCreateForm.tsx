import './EventCreateForm.scss';
import { useState } from 'react';
import { post } from '@gd/shared/utils/api.utils';

type FormState = {
  name: string;
  description: string;
  organizerName: string;
  giftBudget: number;
  location: string;
  exchangeDate: string;
  participants: string[]; // participant names, comma-separated input
};

const initialFormState: FormState = {
  name: '',
  description: '',
  organizerName: '',
  giftBudget: 50,
  location: '',
  exchangeDate: '',
  participants: [],
};

export default function EventCreateForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'giftBudget' ? parseInt(value) : value,
    }));
  };

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const names = value.split(',').map(name => name.trim()).filter(Boolean);
    setForm(prev => ({
      ...prev,
      participants: names,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await post('/events', {
        ...form,
        participants: form.participants.map(name => ({ name })),
        exclusions: [],
      });

      setMessage('Event created successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to create event.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-create-form">
      <h2>Create Event</h2>

      <input name="name" placeholder="Event Name" value={form.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="organizerName" placeholder="Organizer Name" value={form.organizerName} onChange={handleChange} required />
      <input name="giftBudget" type="number" placeholder="Gift Budget" value={form.giftBudget} onChange={handleChange} />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <input name="exchangeDate" type="datetime-local" value={form.exchangeDate} onChange={handleChange} />
      <input name="participants" placeholder="Participants (comma separated)" onChange={handleParticipantsChange} />

      <button type="submit">Create Event</button>

      {message && <p>{message}</p>}
    </form>
  );
}
