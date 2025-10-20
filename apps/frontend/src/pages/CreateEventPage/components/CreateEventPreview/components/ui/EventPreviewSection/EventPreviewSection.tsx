import type React from 'react';
import './EventPreviewSection.scss';

type Props = {
  children: React.ReactNode;
};

export default function EventPreviewSection({ children }: Props) {
  return <section className='event-preview-section'>{children}</section>;
}
