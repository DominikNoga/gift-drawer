import { InterfaceIcons, UserIcons } from '@gd/shared/constants/icons';
import './EventCreateSteps.scss';
import CircleIcon from '@gd/shared/components/icons/CircleIcon/CircleIcon';

const STEPS = [
  {
    title: 'Basic information',
    icon: <InterfaceIcons.Info />,
  },
  {
    title: 'Add participants',
    icon: <UserIcons.Users />
  },
  {
    title: 'Set exclusions',
    icon: <UserIcons.UserExclude />
  }
];

type EventCreateStepsProps = {
  currentStep: 0 | 1 | 2;
};

export default function EventCreateSteps({ currentStep = 0 }: EventCreateStepsProps) {
  return (
    <div className="create-event-steps">
      <div className={`progress-line-1 ${currentStep >= 1 && 'progress-line-filled'}`}></div>
      <div className={`progress-line-2 ${currentStep === 2 && 'progress-line-filled'}`}></div>
      {
        STEPS.map(step => (
          <div key={step.title} className="create-event-step">
            <CircleIcon
              icon={step.icon}
              className='create-event-step-icon'
            />
            <span className='create-event-step-title'>{step.title}</span>
          </div>
        ))
      }
    </div>
  );
}
