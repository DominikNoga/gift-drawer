import { useState } from 'react';
import TabView from './components/TabView/TabView';
import './MainSection.scss';
import ParticipantsTab from './components/TabView/components/ParticipantsTab/ParticipantsTab';
import DrawNamesTab from './components/TabView/components/DrawNamesTab/DrawNamesTab';
import YourAssignmentTab from './components/TabView/components/YourAssignmentTab/YourAssignmentTab';
import WishlistTab from './components/TabView/components/WishlistTab/WishlistTab';
import { useEventPageContext } from '../../providers/EventPageContextProvider/EventPageContextProvider';

export default function MainSection() {
  const { event, isOrganizer } = useEventPageContext();
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const getUserAssignment = (): string | undefined => {
    if (event.currentParticipant.drawnParticipantId) {
      return event.participants.find(p => p.id === event.currentParticipant.drawnParticipantId)?.name;
    }
    return undefined;
  };

  const tabs = [
    <ParticipantsTab key='participants' participants={event.participants} />,
    <YourAssignmentTab key='assignments' assignment={getUserAssignment()} />,
    <WishlistTab key='wishlist' currentParticipantId={event.currentParticipant.id} />,
  ];

  if (isOrganizer) {
    tabs.push(<DrawNamesTab key='draw-names-tab' eventId={event.id} />);
  }

  return (
    <TabView onTabChange={handleTabChange} isOrganizer={isOrganizer}>
      {tabs[activeTab]}
    </TabView>
  );
}
