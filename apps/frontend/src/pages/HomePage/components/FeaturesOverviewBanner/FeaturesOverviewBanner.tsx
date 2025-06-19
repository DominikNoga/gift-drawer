import Card from '@gd/shared/components/Card/Card';
import './FeaturesOverviewBanner.scss';
import { FEATURES_OVERVIEW_CONFIG } from './FeaturesOverviewBanner.config';
import FeatureInfo from './components/FeatureInfo/FeatureInfo';

export default function FeaturesOverviewBanner() {
  return (
    <Card className='features-overview-banner'>
      <header>
        <h2>Why Choose Our Secret Santa Organizer?</h2>
      </header>
      <section className='features-overview-banner-content'>
        {
          FEATURES_OVERVIEW_CONFIG.map(feature => (
            <FeatureInfo key={feature.title} {...feature} />
          ))
        }
      </section>
    </Card>
  );
}
