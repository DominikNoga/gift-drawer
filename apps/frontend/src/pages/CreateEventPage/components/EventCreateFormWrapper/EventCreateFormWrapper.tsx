import Card from '@gd/shared/components/Card/Card';
import React from 'react';

type EventCreateFormWrapperProps = {
  children: React.ReactNode;
};

export default function EventCreateFormWrapper({ children }: EventCreateFormWrapperProps) {
  return (
    <Card className='event-create-form-card'>
      {children}
    </Card>
  );
}
