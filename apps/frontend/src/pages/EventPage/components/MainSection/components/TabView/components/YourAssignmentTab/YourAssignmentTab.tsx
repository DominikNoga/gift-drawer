import { ChristmasIcons } from '@gd/shared/constants/icons';
import './YourAssignmentTab.scss';
import TabWithIconCentered from '../TabWithIconCentered/TabWithIconCentered';
import Button from '@gd/shared/components/buttons/Button/Button';
import { useEventPageContext } from '../../../../../../providers/EventPageContextProvider/EventPageContextProvider';
import { cacheDisplayedAssignment } from '@gd/shared/services/displayed-assignment/displayed-assignment.cache.service';
import { getAssignmentTabState } from './YourAssignmentTab.utils';
import { useEffect, useState } from 'react';
import { ASSIGNMENT_STATES } from './YourAssignmentTab.const';
import LoadingSpinner from '@gd/shared/components/LoadingSpinner/LoadingSpinner';
import type { WishlistItem } from '@gd/types/src/models/wish.model';
import { getParticipantWishlist } from '@gd/shared/services/wishes-services/wishes.service';
import YourAssignmentWishes from './components/YourAssignmentWishes/YourAssignmentWishes';

export default function YourAssignmentTab() {
  const { event } = useEventPageContext();

  const getUserAssignment = (): string | undefined => {
    if (event.currentParticipant.drawnParticipantId) {
      return event.participants.find(p => p.id === event.currentParticipant.drawnParticipantId)?.name;
    }
    return undefined;
  };
  const assignment = getUserAssignment();
  const [tabState, setTabState] = useState(getAssignmentTabState(event.id, event.currentParticipant.id, assignment));
  const [assignmentWishes, setAssignmentWishes] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishes = async () => {
      if (assignment) {
        const wishlist = await getParticipantWishlist(event.currentParticipant.drawnParticipantId!);
        setAssignmentWishes(wishlist);
      }
    };
    setTabState(getAssignmentTabState(event.id, event.currentParticipant.id, assignment));
    fetchWishes();
  }, [event, assignment]);

  const onReveal = () => {
    setTabState(ASSIGNMENT_STATES.IS_REVEALING);
    setTimeout(() => {
      setTabState(ASSIGNMENT_STATES.ASSIGNMENT_REVEALED);
    }, 1500);
  };

  let content;
  switch (tabState) {
    case ASSIGNMENT_STATES.NO_ASSIGNMENT:
      content = <NoAssignment />;
      break;
    case ASSIGNMENT_STATES.ASSIGNMENT_HIDDEN:
      content = <RevealAssignment
        onReveal={onReveal}
        eventId={event.id}
        participantId={event.currentParticipant.id}
      />;
      break;
    case ASSIGNMENT_STATES.ASSIGNMENT_REVEALED:
      content = (
        <>
          <div className="your-assignment-tab-result">
            <p>{assignment}</p>
          </div>
          <YourAssignmentWishes wishlistItems={assignmentWishes} drawnParticipantName={assignment!} />
        </>
      );
      break;
    case ASSIGNMENT_STATES.IS_REVEALING:
      content = <LoadingAssignment />;
      break;
  }

  return (
    <TabWithIconCentered title="You are a secret santa for..." icon={<ChristmasIcons.Gift />}>
      {content}
    </TabWithIconCentered>
  );
}

function NoAssignment() {
  return (
    <div className="no-assignment">
      <p>
        The organizer hasn&apos;t drawn names yet.
        You&apos;ll be able to see your assignment once the drawing is complete!
      </p>
    </div>
  );
}

type RevealAssignmentProps = {
  onReveal: () => void;
  eventId: string;
  participantId: string;
};

function RevealAssignment({ onReveal, eventId, participantId }: RevealAssignmentProps) {
  const handleReveal = () => {
    cacheDisplayedAssignment(eventId, participantId);
    onReveal();
  };

  return (
    <div className="reveal-assignment">
      <p>🎁 Your assignment is ready!</p>
      <Button
        btnType='secondary'
        className='reveal-assignment-button'
        onClick={handleReveal}>
        Reveal your assignment
      </Button>
    </div>
  );
}

function LoadingAssignment() {
  return (
    <div className="loading-assignment">
      <p>Revealing your assignment...</p>
      <LoadingSpinner />
    </div>
  );
}