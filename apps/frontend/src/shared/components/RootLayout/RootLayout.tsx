import { Outlet } from 'react-router-dom';
import PageWrapper from '../PageWrapper/PageWrapper';

export default function RootLayout() {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
}
