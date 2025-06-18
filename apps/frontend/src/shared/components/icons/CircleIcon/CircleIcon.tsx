import React from 'react';
import './CircleIcon.scss';

type CircleIconProps = {
  icon: React.ReactNode;
  backgroundColor: string;
  iconColor: string;
};

export default function CircleIcon({ icon, backgroundColor, iconColor }: CircleIconProps) {
  return (
    <div className='circle-icon' style={{
      backgroundColor: backgroundColor,
      color: iconColor}}>
      { icon }
    </div>
  );
}
