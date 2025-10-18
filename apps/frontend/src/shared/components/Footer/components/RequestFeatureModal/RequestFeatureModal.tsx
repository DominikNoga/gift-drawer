import Button from '../../../buttons/Button/Button';
import Input from '../../../Input/Input';
import Modal from '../../../Modal/Modal';
import './RequestFeatureModal.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RequestFeatureModal({ isOpen, onClose }: Props) {

  return (
    <Modal isOpen={isOpen} title="Request a Feature" onClose={onClose}>
      <form className="request-feature-form">
        <Input
          id='email'
          name='email'
          label='Email'
          type='email'
          placeholder='johndoe@example.com'
          required
        />
        <Input
          id='feature-description'
          name='feature-description'
          label='Feature Description'
          type='text'
          placeholder='Describe the feature you would like to see...'
          required
          isTextarea
        />
        <div className="request-feature-form-buttons">
          <Button btnType='transparent' type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button btnType='primary' type="submit">
            Submit Request
          </Button>
        </div>
      </form>
    </Modal>
  );
}
