import './Footer.scss';
import { useNavigate } from 'react-router-dom';
import { InterfaceIcons, SocialIcons } from '../../constants/icons';
import ButtonWithIcon from '../buttons/ButtonWithIcon/ButtonWithIcon';
import { ROUTES_NAMES } from '../../../routes';


export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <section className='footer-info'>
        <section className='footer-info-item'>
          <h3 className='footer-info-item-title'>🎁 Secret Santa Organizer</h3>
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
          <ul className='footer-link'>
            <li>
              <span className='footer-link' onClick={() => navigate(ROUTES_NAMES.CREATE_EVENT)}>Create an event</span>
            </li>
            <li>
              <span className='footer-link'>Request a feature</span>
            </li>
            <li>
              <span className='footer-link'>How it works?</span>
            </li>
          </ul>
        </section>
        <section className='footer-info-item'>
          <h3 className='footer-info-item-title'>Support</h3>
          <ButtonWithIcon className='footer-support-button' icon={<InterfaceIcons.Message />}>
            Request a feature
          </ButtonWithIcon>
          <p>
            Have an idea to make Secret Santa even better? We&apos;d love to hear from you!
          </p>
        </section>
      </section>
      <section className='footer-copy'>
        <p className='footer-copy-text'>© 2025 Secret Santa Organizer. Made with ❤️ for spreading holiday joy.</p>
        <p className='footer-copy-stack'>
          Built with React, TypeScript, Node.js, and a bit of holiday magic.
        </p>
      </section>
    </footer>
  );
}
