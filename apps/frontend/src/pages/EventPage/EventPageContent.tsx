import Header from './components/Header/Header';
import Description from './components/Description/Description';
import InfoCards from './components/InfoCards/InfoCards';
import MainSection from './components/MainSection/MainSection';
import { useEventPageContext } from './providers/EventPageContextProvider/EventPageContextProvider';
import PageLoading from '@gd/shared/components/PageLoading/PageLoading';

export default function EventPageContent() {
  const { isLoading } = useEventPageContext();

  if (isLoading) {
    return <PageLoading text="Loading event details..." />;
  }

  return (
    <main className="event-page">
      <Header />
      <Description />
      <InfoCards />
      <MainSection />
    </main>
  );
}
