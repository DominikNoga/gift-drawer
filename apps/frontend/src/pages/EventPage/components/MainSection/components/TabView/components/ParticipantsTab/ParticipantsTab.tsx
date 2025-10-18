import type { ParticipantUI } from '@gd/types/src/models/participants.model';
import ParticipantsTabItem from './components/ParticipantsTabItem/ParticipantTabItem';
import './ParticipantsTab.scss';

type Props = {
  participants?: ParticipantUI[];
};

export default function ParticipantsTab({ participants }: Props) {
  return (
    <div className='participants-tab'>
      <header>
        <h3 className='participants-tab-header'>Participants ({participants?.length})</h3>
      </header>
      {participants?.map((participant) => (
        <ParticipantsTabItem
          key={participant.name}
          name={participant.name}
          joinCode={participant.joinCode}
        />
      ))}
    </div>
  );
}
