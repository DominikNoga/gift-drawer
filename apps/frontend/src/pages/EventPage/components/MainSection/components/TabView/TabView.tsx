import './TabView.scss';
import type React from 'react';
import Card from '@gd/shared/components/Card/Card';
import { type HeaderProps } from './TabView.types';
import { useEffect, useMemo } from 'react';
import { getTabViewOptions } from './TabView.utils';
import TabViewHeader from './components/TabViewHeader/TabViewHeader';

type Props = {
  children?: React.ReactNode;
  onTabChange: (tabIndex: number) => void;
  isOrganizer: boolean;
  initialActiveTab?: number;
  activeTab?: number;
  namesDrawn?: boolean;
};

export default function TabView({ children, onTabChange, isOrganizer, activeTab = 0, namesDrawn = false }: Props) {
  const tabs: HeaderProps[] = useMemo(() => getTabViewOptions(isOrganizer, activeTab, namesDrawn).map((tab, index) => ({
    ...tab,
    isActive: index === activeTab,
    onClick: () => onTabChange(index),
  })), [activeTab, isOrganizer, onTabChange]);

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
