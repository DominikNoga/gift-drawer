import './TabView.scss';
import type React from 'react';
import Card from '@gd/shared/components/Card/Card';
import { type HeaderProps } from './TabView.types';
import { useEffect, useMemo, useState } from 'react';
import { tabViewOptions } from './TabView.cost';
import TabViewHeader from './components/TabViewHeader/TabViewHeader';
type Props = {
  children?: React.ReactNode;
  onTabChange: (tabIndex: number) => void;
};

export default function TabView({ children, onTabChange }: Props) {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  const tabs: HeaderProps[] = useMemo(() => tabViewOptions.map((tab, index) => ({
    ...tab,
    isActive: index === activeTab,
    onClick: () => setActiveTab(index),
  })), [activeTab]);

  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  return (
    <Card className='tab-view'>
      <TabViewHeader tabs={tabs} />
      <div className="tab-view-content">
        {children}
      </div>
    </Card>
  );
}
