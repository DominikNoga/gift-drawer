import './index.scss';
import EventCreateForm from "./components/EventCreateForm/EventCreateForm";
import EventCreateSteps from "./components/EventCreateSteps/EventCreateSteps";
import { useState } from 'react';
import type { CurrentStep } from './types/types';

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState<CurrentStep>(0);
  return (
    <>
      <main className="create-event-page-content">
        <EventCreateSteps currentStep={currentStep}/>
        <EventCreateForm />
      </main>
    </>
  );
}
