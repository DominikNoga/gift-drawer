import './BackButton.scss';
import { NavigationIcons } from '@gd/shared/constants/icons';

type Props = {
  onClick: () => void;
  isDisabled: boolean;
  filled?: boolean;
};

export default function BackButton({ onClick, isDisabled, filled }: Props) {

  return (
    <button
      className={`back-btn${isDisabled ? '-disabled' : ''} ${filled ? ' back-btn-filled' : ''}`}
      type='button'
      onClick={onClick}
      disabled={isDisabled}
    >
      <NavigationIcons.Back className='back-btn-icon'/>
    </button>
  );
}
