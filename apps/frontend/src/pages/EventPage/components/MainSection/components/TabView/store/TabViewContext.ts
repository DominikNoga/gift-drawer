import { createContext } from "react";

type TabViewContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const TabViewContext = createContext<TabViewContextType | null>(null);