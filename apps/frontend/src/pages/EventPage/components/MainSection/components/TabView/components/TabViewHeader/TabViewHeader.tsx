import './TabViewHeader.scss';
import type { HeaderProps } from "../../TabView.types";

type Props = {
  tabs: HeaderProps[];
};

export default function TabViewHeader({ tabs }: Props) {
  return (
    <header className='tab-view-header' style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
      {tabs.map((tab) => (
        <div
          key={tab.title}
          className={`tab-view-header-item ${tab.isActive ? 'active' : ''}`}
          onClick={tab.onClick}
        >
          {tab.icon}
          <span className='tab-view-header-item-title'>
            {tab.title}
          </span>
        </div>
      ))}
    </header>
  );
}
