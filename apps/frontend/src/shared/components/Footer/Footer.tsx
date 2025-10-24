import './Footer.scss';
import { useNavigate } from 'react-router-dom';
import { SocialIcons } from '../../constants/icons';
// import ButtonWithIcon from '../buttons/ButtonWithIcon/ButtonWithIcon';
import { ROUTES_NAMES } from '../../../routes';
// import { useState } from 'react';
// import RequestFeatureModal from './components/RequestFeatureModal/RequestFeatureModal';


export default function Footer() {
  const navigate = useNavigate();
  // const [isRequestFeatureModalOpen, setIsRequestFeatureModalOpen] = useState(false);

  // const onModalClose = () => {
  //   setIsRequestFeatureModalOpen(false);
  // };

  // const handleRequestFeatureClick = () => {
  //   setIsRequestFeatureModalOpen(true);
  // };

  return (
    <footer className="footer">
      <section className='footer-info'>
        <section className='footer-info-item'>
          <h3 className='footer-info-item-title'>🎁 Gift Drawer</h3>
          <p>Making holiday gift exchanges magical and stress-free. Organize your Secret Santa events with ease and bring joy to your celebrations.</p>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/dominik-noga-90516b238/" className="footer-socials-link" target="_blank" rel="noopener noreferrer">
              <SocialIcons.Linkedin />
            </a>
            <a href="https://github.com/DominikNoga/gift-drawer" className="footer-socials-link" target="_blank" rel="noopener noreferrer">
              <SocialIcons.Github />
            </a>
          </div>
        </section>
        <section className='footer-info-item'>
          <h3 className='footer-info-item-title'>🔗 Links</h3>
          <ul className='footer-links'>
            <li>
              <span className='footer-link' onClick={() => navigate(ROUTES_NAMES.CREATE_EVENT)}>Create an event</span>
            </li>
            <li>
              {/* <span className='footer-link' onClick={handleRequestFeatureClick}>Request a feature</span> */}
            </li>
            <li>
              <span className='footer-link'>How it works?</span>
            </li>
          </ul>
        </section>
        <section className='footer-info-item'>
          <h3 className='footer-info-item-title'>Support</h3>
          {/* <ButtonWithIcon className='footer-support-button' onClick={handleRequestFeatureClick} icon={<InterfaceIcons.Message />}>
            Request a feature
          </ButtonWithIcon> */}
          <p>
            Have an idea to make Secret Santa even better? We&apos;d love to hear from you!
          </p>
        </section>
      </section>
      <section className='footer-copy'>
        <p className='footer-copy-text'>© 2025 Gift Drawer by Dominik Frankiewicz 🎁</p>
        <p className='footer-copy-stack'>
          Built with React, TypeScript, Node.js, and a bit of holiday magic.
        </p>
      </section>
      {/* <RequestFeatureModal isOpen={isRequestFeatureModalOpen} onClose={onModalClose} /> */}
    </footer>
  );
}
