import EventCardsSection from "./components/EventCardsSection/EventCardsSection";
import FeaturesOverviewBanner from "./components/FeaturesOverviewBanner/FeaturesOverviewBanner";
import Header from "./components/Header/Header";
import HowItWorksSection from "./components/HowItWorksSection/HowItWorksSection";
import MyEventsSection from "./components/MyEventsSection/MyEventsSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <EventCardsSection />
      <HowItWorksSection />
      <MyEventsSection />
      <FeaturesOverviewBanner />
    </>
  );
}
