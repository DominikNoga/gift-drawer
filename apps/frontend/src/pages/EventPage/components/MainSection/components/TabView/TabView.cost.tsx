import { type HeaderProps } from './TabView.types';
import { ChristmasIcons, UserIcons } from '@gd/shared/constants/icons';

export const tabViewOptions: Omit<HeaderProps, 'onClick'>[] = [
  { isActive: true, title: 'Participants', icon: <UserIcons.Users /> },
  { isActive: false, title: 'Your assignment', icon: <ChristmasIcons.Gift /> },
  { isActive: false, title: 'Your wishlist', icon: <ChristmasIcons.Wishlist /> },
  { isActive: false, title: 'Organizer section', icon: <UserIcons.User /> },
];
