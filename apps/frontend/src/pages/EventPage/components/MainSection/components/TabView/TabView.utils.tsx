import { type HeaderProps } from './TabView.types';
import { ChristmasIcons, UserIcons } from '@gd/shared/constants/icons';

export const getTabViewOptions = (isOrganizer: boolean, activeTab: number, namesDrawn: boolean) => {
  const tabViewOptions: Omit<HeaderProps, 'onClick'>[] = [
    { isActive: false, title: 'Participants', icon: <UserIcons.Users /> },
    { isActive: false, title: 'Your assignment', icon: <ChristmasIcons.Gift /> },
    { isActive: false, title: 'Your wishlist', icon: <ChristmasIcons.Wishlist /> }
  ];
  if (isOrganizer && !namesDrawn) {
    tabViewOptions.push({ isActive: false, title: 'Draw names', icon: <ChristmasIcons.Shuffle /> });
  }
  tabViewOptions.map((tab, index) => {
    if (index === activeTab) {
      tab.isActive = true;
    }
    return tab;
  });
  return tabViewOptions;
};
