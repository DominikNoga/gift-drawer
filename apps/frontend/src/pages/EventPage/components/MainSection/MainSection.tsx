import { useState } from 'react';
import TabView from './components/TabView/TabView';
import './MainSection.scss';
import type { Event } from '@gd/types/src/models/events.model';
import ParticipantsTab from './components/TabView/components/ParticipantsTab/ParticipantsTab';
import OrganizerTab from './components/TabView/components/OrganizerTab/OrganizerTab';

type Props = {
  event: Event;
}

export default function MainSection({ event }: Props) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const tabs = [
    <ParticipantsTab key='participants' participants={event.participants} />,
    <h1 key='assignments'>Assignments</h1>,
    <h1 key='wishlist'>Wishlist</h1>,
    <OrganizerTab key='organizer' eventId={event.id} />
  ];

  return (
    <TabView onTabChange={handleTabChange}>
      {tabs[activeTab]}
    </TabView>
  );
}
