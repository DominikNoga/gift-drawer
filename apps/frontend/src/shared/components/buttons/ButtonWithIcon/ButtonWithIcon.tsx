import type React from 'react';
import './ButtonWithIcon.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
};

export default function ButtonWithIcon({ icon, ...props }: Props) {
  return (
    <button
      // TODO: remove this from eslint
      {...props}
      className={`btn-with-icon${props.disabled ? '-disabled' : ''} ${props.className || ''}`}
    >
      {icon && <span className='btn-icon'>{icon}</span>}
      {props.children}
    </button>
  );
}
