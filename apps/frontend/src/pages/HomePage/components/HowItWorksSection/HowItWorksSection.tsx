import Card from '@gd/shared/components/Card/Card';
import { STEPS } from './HowItWorksSection.const';
import './HowItWorksSection.scss';

export default function HowItWorksSection() {
  return (
    <Card className='how-it-works-section'>
      <header>
        <h2>How it works</h2>
        <p>
          Organizing a Secret Santa has never been easier. Follow these simple steps to create a memorable gift exchange.
        </p>
      </header>
      {
        STEPS.map((step, index) => (
          <div key={index} className='step'>
            <div className="step-number" style={{ backgroundColor: step.color }}>
              {(index + 1).toString()}
            </div>
            <div className='step-content'>
              <header>
                <div className='step-icon' style={{ color: step.color }}>
                  {step.icon}
                </div>
                <h3 className='step-title'>{step.title}</h3>
              </header>
              <p>{step.description}</p>
            </div>
          </div>
        ))
      }
    </Card>
  );
}
