import EventCardsSection from "./components/EventCardsSection/EventCardsSection";
import Header from "./components/Header/Header";
import MyEventsSection from "./components/MyEventsSection/MyEventsSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <EventCardsSection />
      <MyEventsSection />
    </>
  );
}
