import './Modal.scss';
import type React from "react";
import { createPortal } from "react-dom";
import { MODAL_PORTAL_ID } from "../../constants/const";
import { InterfaceIcons } from '../../constants/icons';

type Props = {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title: string;
  closeHidden?: boolean;
};

export default function Modal({ children, isOpen, onClose, title, closeHidden = false }: Props) {
  return createPortal(
    <div className="modal-backdrop" style={{ display: isOpen ? 'flex' : 'none' }}>
      <dialog open={isOpen} className="modal" onClose={onClose}>
        <header className="modal-header">
          <h2 className="modal-title">{title}</h2>
          {onClose && !closeHidden && (
            <button className="modal-close-button" onClick={onClose} aria-label="Close modal">
              <InterfaceIcons.Cancel />
            </button>
          )}
        </header>
        <div className="modal-content">
          {children}
        </div>
      </dialog>
    </div>,
    document.getElementById(MODAL_PORTAL_ID) as HTMLElement,
  );
}
