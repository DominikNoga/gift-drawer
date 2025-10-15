import { drawAssignments } from '@gd/shared/services/events-services/events.service';
import './DrawNamesTab.scss';
import TabWithIconCentered from '../TabWithIconCentered/TabWithIconCentered';
import { ChristmasIcons } from '@gd/shared/constants/icons';
import DrawNamesModal from './components/DrawNamesModal/DrawNamesModal';
import { useState } from 'react';
import { useEventPageContext } from '../../../../../../providers/EventPageContextProvider/EventPageContextProvider';
import { MODAL_STATE, type ModalState } from './DrawNamesTab.types';

const subtitle = `Keep in mind that once you draw names, the assignments cannot be changed. And you won't be able to
  add more participants or set other exclusions after the draw.`;

type Props = {
  eventId: string;
  handleViewAssignment: () => void;
};

export default function DrawNamesTab({ eventId, handleViewAssignment }: Props) {
  const { event: { participants, exclusions } } = useEventPageContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>(MODAL_STATE.IDLE);

  const onDrawAssignments = async () => {
    try {
      setModalState(MODAL_STATE.DRAWING);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setModalState(MODAL_STATE.SUCCESS);
      const result = await drawAssignments(eventId);
      console.log(result);

    } catch (error) {
      console.error('Error drawing assignments:', error);
      setModalState(MODAL_STATE.ERROR);
    }
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    setModalState(MODAL_STATE.IDLE);
  };

  const onViewAssignment = () => {
    resetModalState();
    handleViewAssignment();
  };

  return (
    <>
      <TabWithIconCentered
        title='Ready to Draw Names?'
        icon={<ChristmasIcons.Shuffle />}
        subtitle={subtitle}
      >
        <button className="draw-assignments-button" onClick={() => setIsModalOpen(true)}>
          Draw Assignments
        </button>
      </TabWithIconCentered>
      <DrawNamesModal
        isOpen={isModalOpen}
        onDrawNames={onDrawAssignments}
        modalState={modalState}
        onModalClose={resetModalState}
        exclusionsQuantity={exclusions.length}
        participantsQuantity={participants.length}
        onViewAssignment={onViewAssignment}
      />
    </>
  );
}
