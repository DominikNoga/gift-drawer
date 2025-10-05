import { InterfaceIcons, UserIcons } from '@gd/shared/constants/icons';
import './ParticipantsTabItem.scss';
import SquareIcon from '@gd/shared/components/icons/SquareIcon/SquareIcon';
import { colors } from '@gd/shared/constants/colors';
import { useState } from 'react';

type Props = {
  name: string;
  joinCode?: string;
};

export default function ParticipantsTabItem({ name, joinCode = 'test code' }: Props) {
  const [copyBtnText, setCopyBtnText] = useState('Copy join code');
  
  const handleCopyJoinCode = () => {
    navigator.clipboard.writeText(joinCode);
    setCopyBtnText('Copied!');
    setTimeout(() => setCopyBtnText('Copy join code'), 2000);
  };

  return (
    <div className="participant-tab-item">
      <SquareIcon 
        icon={<UserIcons.User />}
        backgroundColor={colors.blue[100]}
        iconColor={colors.blue[600]}
        size={2}
      />
      <span>{name}</span>
      <button className="participant-tab-item-copy-btn" type="button" onClick={handleCopyJoinCode}>
        <span className="participant-tab-item-copy-btn-icon">
          <InterfaceIcons.Copy />
        </span>
        {copyBtnText}
      </button>
    </div>
  );
}
