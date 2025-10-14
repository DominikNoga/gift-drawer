import { drawAssignments } from '@gd/shared/services/events-services/events.service';
import './DrawNamesTab.scss';
import TabWithIconCentered from '../TabWithIconCentered/TabWithIconCentered';
import { ChristmasIcons } from '@gd/shared/constants/icons';
import DrawNamesModal from './components/DrawNamesModal/DrawNamesModal';
import { useState } from 'react';
import { useEventPageContext } from '../../../../../../providers/EventPageContextProvider/EventPageContextProvider';

const subtitle = `Keep in mind that once you draw names, the assignments cannot be changed. And you won't be able to
  add more participants or set other exclusions after the draw.`;

export default function DrawNamesTab({ eventId }: { eventId: string }) {
  const { event: { participants, exclusions } } = useEventPageContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onDrawAssignments = async () => {
    try {
      setIsModalOpen(true);
      // const result = await drawAssignments(eventId);
      // console.log(result);

    } catch (error) {
      console.error('Error drawing assignments:', error);
    }
  };

  return (
    <>
      <TabWithIconCentered
        title='Ready to Draw Names?'
        icon={<ChristmasIcons.Shuffle />}
        subtitle={subtitle}
      >
        <button className="draw-assignments-button" onClick={onDrawAssignments}>
          Draw Assignments
        </button>
      </TabWithIconCentered>
      <DrawNamesModal
        isOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        exclusionsQuantity={exclusions.length}
        participantsQuantity={participants.length}
      />
    </>
  );
}
