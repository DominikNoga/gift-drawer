import type { CreateExclusionFromEventRequest } from '@gd/types/src/models/exclusions.model';
import FormHeader from '../../ui/FormHeader/FormHeader';
import EventPreviewSection from '../components/ui/EventPreviewSection/EventPreviewSection';
import EventPreviewList from '../components/ui/EventPreviewList/EventPreviewList';

type Props = {
  exclusions: CreateExclusionFromEventRequest[];
};

export default function ExclusionsSection({ exclusions }: Props) {
  const subtitle = exclusions.length === 0 ? 'No exclusions set for this event.' : undefined;
  return (
    <EventPreviewSection>
      <FormHeader title="Exclusions" subtitle={subtitle} />
      {
        exclusions.length > 0 && (
          <EventPreviewList>
            {exclusions.map((exclusion) => (
              <li key={`${exclusion.participantName}-${exclusion.excludedParticipantName}`}>
                {exclusion.participantName} excludes {exclusion.excludedParticipantName}
              </li>
            ))}
          </EventPreviewList>
        )
      }
    </EventPreviewSection>
  );
}
