import './EventPreviewList.scss';
import React from 'react';

type Props = {
  children: React.ReactNode;
}

export default function EventPreviewList({ children }: Props) {
  return (
    <ul className="event-preview-list">{children}</ul>
  );
}
