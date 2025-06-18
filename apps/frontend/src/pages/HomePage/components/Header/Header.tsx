import './Header.scss';
import { ChristmasIcons } from '@gd/shared/constants/icons';

export default function Header() {
  return (
    <header className='home-page-header'>
      <h1 className='home-page-header-title'>
        <ChristmasIcons.Gift className='gift-icon'/>
        Gift Drawer
      </h1>
      <p className='home-page-header-subtitle'>
        Create and manage your Secret Santa gift exchanges with ease. Set up events, invite participants, and let the magic happen! 🎄
      </p>
    </header>
  );
}
