import type { CreateEventRequestDto } from '@gd/types/src/models/events.model';
import './BasicInfoSection.scss';

type Props = Omit<CreateEventRequestDto, 'exclusions' | 'participants'>

export default function BasicInfoSection({ name, organizerName, exchangeDate, giftBudget, description, location }: Props) {
  return (
    <section className='event-preview-section-basic-info'>
      <h2>Event Basic Information</h2>
      <div className='event-preview-section-basic-info-content'>
        <p>
          <strong>Event Name:</strong> {name}
        </p>
        <p>
          <strong>Organizer Name:</strong> {organizerName}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
        {exchangeDate && (
          <p>
            <strong>Exchange Date:</strong> {new Date(exchangeDate).toLocaleDateString()}
          </p>
        )}
        {giftBudget && (
          <p>
            <strong>Gift Budget:</strong> ${giftBudget}
          </p>
        )}
        {location && (
          <p>
            <strong>Location:</strong> {location}
          </p>
        )}
      </div>
    </section>
  );
}
