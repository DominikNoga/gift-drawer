import type { CreateEventRequest } from '@gd/types/src/api/api.events.types';
import './BasicInfoSection.scss';
import FormHeader from '../../ui/FormHeader/FormHeader';
import EventPreviewSection from '../components/ui/EventPreviewSection/EventPreviewSection';

type Props = Omit<CreateEventRequest, 'exclusions' | 'participants'>

export default function BasicInfoSection({ name, organizerName, exchangeDate, giftBudget, description, location }: Props) {
  return (
    <EventPreviewSection>
      <FormHeader title="Basic Information" />
      <p>
        <strong className='basic-info-label'>Event Name:</strong> {name}
      </p>
      <p>
        <strong className='basic-info-label'>Organizer Name:</strong> {organizerName}
      </p>
      <p>
        <strong className='basic-info-label'>Description:</strong> {description}
      </p>
      {exchangeDate && (
        <p>
          <strong className='basic-info-label'>Exchange Date:</strong> {new Date(exchangeDate).toLocaleDateString()}
        </p>
      )}
      {giftBudget && (
        <p>
          <strong className='basic-info-label'>Gift Budget:</strong> ${giftBudget}
        </p>
      )}
      {location && (
        <p>
          <strong className='basic-info-label'>Location:</strong> {location}
        </p>
      )}
    </EventPreviewSection>
  );
}
