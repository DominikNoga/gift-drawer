import { Outlet } from 'react-router-dom';
import PageWrapper from '../PageWrapper/PageWrapper';
import { MODAL_PORTAL_ID } from '../../constants/const';
import Footer from '../Footer/Footer';

export default function RootLayout() {
  return (
    <>
      <PageWrapper>
        <Outlet />
        <div id={MODAL_PORTAL_ID}></div>
      </PageWrapper>
      <Footer />
    </>
  );
}
