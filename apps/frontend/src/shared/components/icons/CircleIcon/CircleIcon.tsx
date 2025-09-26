import React from 'react';
import './CircleIcon.scss';

type CircleIconProps = {
  icon: React.ReactNode;
  className: string;
};

export default function CircleIcon({ icon, className }: CircleIconProps) {
  return (
    <div className={`circle-icon ${className}`}>
      { icon }
    </div>
  );
}
