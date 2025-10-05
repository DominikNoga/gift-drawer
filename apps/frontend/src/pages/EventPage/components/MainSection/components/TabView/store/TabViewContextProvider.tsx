import React, { useState } from 'react'
import { TabViewContext } from './TabViewContext';

type Props = {
  children: React.ReactNode
};

export default function TabViewContextProvider({ children }: Props) {
  const [activeTab, setActiveTab] = useState<string>('');

  return (
    <TabViewContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabViewContext.Provider>
  );
}
