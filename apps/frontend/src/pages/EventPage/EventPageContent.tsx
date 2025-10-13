import Header from './components/Header/Header';
import Description from './components/Description/Description';
import InfoCards from './components/InfoCards/InfoCards';
import MainSection from './components/MainSection/MainSection';
import { useEventPageContext } from './providers/EventPageContextProvider/EventPageContextProvider';

export default function EventPageContent() {
  const { isLoading } = useEventPageContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className='event-page'>
      <Header />
      <Description />
      <InfoCards />
      <MainSection />
    </main>
  );
}
