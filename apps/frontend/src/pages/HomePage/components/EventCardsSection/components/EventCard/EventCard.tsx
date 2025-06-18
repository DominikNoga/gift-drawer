import Card from '@gd/shared/components/Card/Card';
import './EventCard.scss';
import React from 'react';

export type EventCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function EventCard({ icon, title, description, children }: EventCardProps) {
  return (
    <Card>
      <div className="event-card">
        <span>
          {icon}
        </span>
        <h3 className="event-card-title">{title}</h3>
        <p className="event-card-description">{description}</p>
        {children}
      </div>
    </Card>
  );
}
