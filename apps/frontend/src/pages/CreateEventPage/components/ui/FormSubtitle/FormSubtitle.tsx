import type React from 'react';
import './FormSubtitle.scss';

type Props = {
  children: React.ReactNode;
};

export default function FormSubtitle({ children }: Props) {
  return (
    <p className="form-subtitle">{children}</p>
  );
}
