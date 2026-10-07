import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateEventContextProvider from '../../store/CreateEventContext/CreateEventContext';
import { CREATE_EVENT_FORM_VALUE_KEY } from '../../constants/constants';
import EventCreateForm from './EventCreateForm';

const renderForm = () =>
  render(
    <CreateEventContextProvider>
      <EventCreateForm />
    </CreateEventContextProvider>,
  );

const fillBasicData = async () => {
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/Event name/), 'Office Secret Santa');
  await user.type(screen.getByLabelText(/Description/), 'Gift exchange after the Christmas lunch');
  await user.type(screen.getByLabelText(/Organizer Name/), 'Anna');
  await user.type(screen.getByLabelText(/Location/), 'Office kitchen');
  await user.type(screen.getByLabelText(/Gift Budget/), '50');
  fireEvent.change(screen.getByLabelText(/Exchange Date/), {
    target: { value: '2026-12-20T18:00' },
  });

  return user;
};

describe('EventCreateForm', () => {
  it('starts on the basic information step with required fields marked', () => {
    renderForm();

    expect(screen.getByText('Basic information')).toBeInTheDocument();
    expect(screen.getByLabelText(/Event name \*/)).toBeRequired();
    expect(screen.getByLabelText(/Organizer Name \*/)).toBeRequired();
    expect(screen.getByLabelText(/Gift Budget \(Optional\)/)).not.toBeRequired();
    expect(screen.getByRole('button', { name: 'Next step' })).toBeInTheDocument();
  });

  it('moves to the participants step after submitting basic information', async () => {
    renderForm();
    const user = await fillBasicData();

    await user.click(screen.getByRole('button', { name: 'Next step' }));

    expect(screen.getByText('Participants names')).toBeInTheDocument();
    expect(screen.queryByText('Basic information')).not.toBeInTheDocument();
  });

  it('keeps entered data when going back to the previous step', async () => {
    renderForm();
    const user = await fillBasicData();
    await user.click(screen.getByRole('button', { name: 'Next step' }));

    const [backButton] = screen
      .getAllByRole('button')
      .filter((button) => button.className.includes('back-btn'));
    await user.click(backButton);

    expect(screen.getByLabelText(/Event name/)).toHaveValue('Office Secret Santa');
    expect(screen.getByLabelText(/Gift Budget/)).toHaveValue(50);
    expect(JSON.parse(localStorage.getItem(CREATE_EVENT_FORM_VALUE_KEY) ?? '{}')).toMatchObject({
      createEventData: { name: 'Office Secret Santa', giftBudget: 50 },
    });
  });
});
