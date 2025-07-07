import './index.scss';
import EventCreateForm from "./components/EventCreateForm/EventCreateForm";
import EventCreateSteps from "./components/EventCreateSteps/EventCreateSteps";
import { useState, type FormEvent } from 'react';
import type { CurrentStep, ParticipantsCreateRequest } from './types/types';
import { INITIAL_CREATE_EVENT_FORM_STATE } from './constants/constants';
import type { CreateEventRequestDto } from '@gd/types/src/models/events.model';
import AddParticipantsForm from './components/AddParticipantsForm/AddParticipantsForm';
import type { CreateExclusionFromEventRequest } from '@gd/types/src/models/exclusions.model';
import EventCreateFormWrapper from './components/EventCreateFormWrapper/EventCreateFormWrapper';

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState<CurrentStep>(0);
  const [createEventData, setCreateEventData] = useState<CreateEventRequestDto>(INITIAL_CREATE_EVENT_FORM_STATE);

  const handleBasicDataSubmission = (e: FormEvent, formData: CreateEventRequestDto) => {
    e.preventDefault();
    setCurrentStep(1);
    setCreateEventData(formData);
  };

  const mapParticipantsToRequest = (participants: ParticipantsCreateRequest) => participants.map(p => ({ name: p }));

  const handleAddParticipants = (e: FormEvent, participants: ParticipantsCreateRequest) => {
    e.preventDefault();
    setCurrentStep(2);
    setCreateEventData((data) => ({
      ...data,
      participants: mapParticipantsToRequest(participants),
    }));
  };

  const handleAddExclusions = (e: FormEvent, exclusions: CreateExclusionFromEventRequest[]) => {
    e.preventDefault();

  };

  const Components = [
    <EventCreateForm key='basic-info' onSubmit={handleBasicDataSubmission} />,
    <AddParticipantsForm key='participants' onSubmit={handleAddParticipants} />,
  ];

  const FormComponent = Components[currentStep];

  return (
    <>
      <main className="create-event-page-content">
        <EventCreateSteps currentStep={currentStep} />
        <EventCreateFormWrapper>
          {
            FormComponent
          }
        </EventCreateFormWrapper>
      </main>
    </>
  );
}
