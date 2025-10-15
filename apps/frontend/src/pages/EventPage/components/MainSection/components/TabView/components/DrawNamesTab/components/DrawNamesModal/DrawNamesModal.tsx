import './DrawNamesModal.scss';
import Button from "@gd/shared/components/buttons/Button/Button";
import Modal from "@gd/shared/components/Modal/Modal";
import { ChristmasIcons, InterfaceIcons } from "@gd/shared/constants/icons";
import { MODAL_STATE, type ModalState } from '../../DrawNamesTab.types';
import LoadingSpinner from '@gd/shared/components/LoadingSpinner/LoadingSpinner';

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
  participantsQuantity: number;
  exclusionsQuantity: number;
  onDrawNames: () => void;
  modalState: ModalState;
  onViewAssignment: () => void;
};

export default function DrawNamesModal({ isOpen, onModalClose, participantsQuantity, exclusionsQuantity, onDrawNames, modalState, onViewAssignment }: Props) {
  return (
    <Modal
      title="Draw secret santa assignments"
      onClose={onModalClose}
      isOpen={isOpen}
      closeHidden={modalState === MODAL_STATE.DRAWING}
    >
      <ModalContent
        modalState={modalState}
        participantsQuantity={participantsQuantity}
        exclusionsQuantity={exclusionsQuantity}
        onDrawNames={onDrawNames}
        onViewAssignment={onViewAssignment}
      />
    </Modal>
  );
}

function ModalContent({
  modalState,
  participantsQuantity,
  exclusionsQuantity,
  onDrawNames,
  onViewAssignment
}: Pick<Props, 'modalState' | 'participantsQuantity' | 'exclusionsQuantity' | 'onDrawNames' | 'onViewAssignment'>) {
  let content;

  switch (modalState) {
    case MODAL_STATE.DRAWING:
      content = <LoadingModalContent />;
      break;
    case MODAL_STATE.IDLE:
      content = <DrawNamesModalContent
        participantsQuantity={participantsQuantity}
        exclusionsQuantity={exclusionsQuantity}
        onDrawNames={onDrawNames}
      />;
      break;
    case MODAL_STATE.SUCCESS:
      content = <SuccessModalContent onViewAssignment={onViewAssignment} />;
      break;
    case MODAL_STATE.ERROR:
      content = <ErrorModalContent />;
      break;
    default:
      content = null;
  }

  return (
    <>
      {content}
    </>
  );
}

function SuccessModalContent({ onViewAssignment }: Pick<Props, 'onViewAssignment'>) {
  return (
    <>
      <div className="draw-names-modal-icon-success">
        <InterfaceIcons.Success />
      </div>
      <section className="draw-names-modal-info">
        <h3>Names have been drawn!</h3>
        <p>Each participant has been assigned a Secret Santa. You can now view your assignment.</p>
      </section>
      <Button btnType="primary" className="draw-names-modal-button" onClick={onViewAssignment}>
        View your assignment
      </Button>
    </>
  );
}

function DrawNamesModalContent({ participantsQuantity, exclusionsQuantity, onDrawNames }: Pick<Props, 'participantsQuantity' | 'exclusionsQuantity' | 'onDrawNames'>) {
  return (
    <>
      <section className="draw-names-modal-info">
        <div className="draw-names-modal-icon">
          <ChristmasIcons.Shuffle />
        </div>
        <h3>Ready to draw names?</h3>
        <p>This will randomly assign each participant to give a gift to another participant.</p>
      </section>
      <section className="draw-names-modal-summary">
        <h4>Summary</h4>
        <ul>
          <li>{participantsQuantity} Participants</li>
          <li>{exclusionsQuantity} Exclusions set</li>
        </ul>
      </section>
      <Button btnType="primary" className="draw-names-modal-button" onClick={onDrawNames}>
        Draw names now
      </Button>
    </>
  );
}

function ErrorModalContent() {
  return (
    <div className="draw-names-modal-error">
      <div className="error-icon">!</div>
      <h3>Oops! Something went wrong.</h3>
    </div>
  );
}

function LoadingModalContent() {
  return (
    <div className="draw-names-modal-loading">
      <LoadingSpinner />
      <h3>Drawing names...</h3>
      <p>Creating the perfect and random Secret Santa assignments</p>
    </div>
  );
}
