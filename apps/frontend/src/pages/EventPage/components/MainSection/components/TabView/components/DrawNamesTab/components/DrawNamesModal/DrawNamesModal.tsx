import './DrawNamesModal.scss';
import Button from "@gd/shared/components/buttons/Button/Button";
import Modal from "@gd/shared/components/Modal/Modal";
import { ChristmasIcons } from "@gd/shared/constants/icons";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
  participantsQuantity: number;
  exclusionsQuantity: number;
};

export default function DrawNamesModal({ isOpen, onModalClose, participantsQuantity, exclusionsQuantity }: Props) {
  return (
    <Modal title="Draw Secret Santa Names" onClose={onModalClose} isOpen={isOpen}>
      <section className="draw-names-modal-info">
        <div className="draw-names-modal-icon">
          <ChristmasIcons.Shuffle />
        </div>
        <h3>Ready to Draw Names?</h3>
        <p>This will randomly assign each participant to give a gift to another participant.</p>
      </section>
      <section className="draw-names-modal-summary">
        <h4>Summary</h4>
        <ul>
          <li>{participantsQuantity} Participants</li>
          <li>{exclusionsQuantity} Exclusions set</li>
        </ul>
      </section>
      <Button btnType="primary" className="draw-names-modal-button" onClick={() => {}}>
        Draw names now
      </Button>
    </Modal>
  );
}
