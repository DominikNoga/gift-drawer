import type { CreateExclusionFromEventRequest } from '@gd/types/src/models/exclusions.model'

type Props = {
  exclusions: CreateExclusionFromEventRequest[]
}

export default function ExclusionsSection({ exclusions }: Props) {
  return (
    <section className='event-preview-section event-preview-exclusions'>
      <h2>Exclusions</h2>
      {
        exclusions.length === 0 && (
          <p>No exclusions set for this event.</p>
        )
      }
      {
        exclusions.length > 0 && (
          <ul>
            {exclusions.map((exclusion) => (
              <li key={`${exclusion.participantName}-${exclusion.excludedParticipantName}`}>
                {exclusion.participantName} excludes {exclusion.excludedParticipantName}
              </li>
            ))}
          </ul>
        )
      }
    </section>
  );
}
