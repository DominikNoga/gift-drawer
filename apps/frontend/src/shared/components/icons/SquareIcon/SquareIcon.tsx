import React from 'react';
import './SquareIcon.scss';

type SquareIconProps = {
  icon: React.ReactNode;
  backgroundColor: string;
  iconColor: string;
  size: number;
};

export default function SquareIcon({ icon, backgroundColor, iconColor, size }: SquareIconProps) {
  return (
    <div className='square-icon' style={{
      backgroundColor: backgroundColor,
      color: iconColor,
      width: `${size}em`,
      height: `${size}em`,
    }}>
      { icon }
    </div>
  );
}
