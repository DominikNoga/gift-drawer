import FormHeader from "../../ui/FormHeader/FormHeader";
import EventPreviewList from "../components/ui/EventPreviewList/EventPreviewList";
import EventPreviewSection from "../components/ui/EventPreviewSection/EventPreviewSection";

type Props = {
  participants: { name: string }[]
}

export default function ParticipantsSection({ participants }: Props) {
  return (
    <EventPreviewSection>
      <FormHeader title="Participants" />
      <EventPreviewList>
        {participants.map((participant) => (
          <li key={participant.name}>{participant.name}</li>
        ))}
      </EventPreviewList>
    </EventPreviewSection>
  );
}
