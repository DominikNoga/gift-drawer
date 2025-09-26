type Props = {
  participants: { name: string }[]
}

export default function ParticipantsSection({ participants }: Props) {
  return (
    <section className='event-preview-section event-preview-participants'>
      <h2>Participants</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.name}>{participant.name}</li>
        ))}
      </ul>
    </section>
  );
}
