import { useState } from 'react';
import TabView from './components/TabView/TabView';
import './MainSection.scss';
import ParticipantsTab from './components/TabView/components/ParticipantsTab/ParticipantsTab';
import DrawNamesTab from './components/TabView/components/DrawNamesTab/DrawNamesTab';
import YourAssignmentTab from './components/TabView/components/YourAssignmentTab/YourAssignmentTab';
import WishlistTab from './components/TabView/components/WishlistTab/WishlistTab';
import { useEventPageContext } from '../../providers/EventPageContextProvider/EventPageContextProvider';
import { TAB_INDEXES } from './MainSection.const';
import { cacheActiveTab, getActiveTabFromCache } from '@gd/shared/services/active-tab/active-tab.cache.service';

export default function MainSection() {
  const { event, isOrganizer, refetchEvent } = useEventPageContext();
  const [activeTab, setActiveTab] = useState<number>(getActiveTabFromCache(event.id));

  const handleViewAssignment = () => {
    refetchEvent();
    setActiveTabWithCache(TAB_INDEXES.YOUR_ASSIGNMENT);
  };

  const setActiveTabWithCache = (tabIndex: number) => {
    setActiveTab(tabIndex);
    cacheActiveTab(event.id, tabIndex);
  };

  const tabs = [
    <ParticipantsTab key='participants' participants={event.participants} />,
    <YourAssignmentTab key='assignments' />,
    <WishlistTab key='wishlist' currentParticipantId={event.currentParticipant.id} />,
  ];

  if (isOrganizer && !event.namesDrawn) {
    tabs.push(
      <DrawNamesTab
        key='draw-names-tab'
        eventId={event.id}
        handleViewAssignment={handleViewAssignment}
      />
    );
  }

  return (
    <TabView onTabChange={setActiveTabWithCache} isOrganizer={isOrganizer} activeTab={activeTab} namesDrawn={event.namesDrawn}>
      {tabs[activeTab]}
    </TabView>
  );
}
