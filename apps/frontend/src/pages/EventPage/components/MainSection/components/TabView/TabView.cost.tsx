import { type HeaderProps } from './TabView.types';
import { ChristmasIcons, UserIcons } from '@gd/shared/constants/icons';

export const getTabViewOptions = (isOrganizer: boolean) => {
  const tabViewOptions: Omit<HeaderProps, 'onClick'>[] = [
    { isActive: true, title: 'Participants', icon: <UserIcons.Users /> },
    { isActive: false, title: 'Your assignment', icon: <ChristmasIcons.Gift /> },
    { isActive: false, title: 'Your wishlist', icon: <ChristmasIcons.Wishlist /> }
  ];
  if (isOrganizer) {
    tabViewOptions.push({ isActive: false, title: 'Draw names', icon: <ChristmasIcons.Shuffle /> });
  }
  return tabViewOptions;
};
