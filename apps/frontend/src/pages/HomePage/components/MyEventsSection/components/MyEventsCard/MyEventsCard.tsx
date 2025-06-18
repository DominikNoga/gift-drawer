import type { Event } from '@gd/shared/types';
import './MyEventsCard.scss';
import Card from '@gd/shared/components/Card/Card';
import { ChristmasIcons, InterfaceIcons, NavigationIcons, UserIcons } from '@gd/shared/constants/icons';

type MyEventsCardProps = {
  event: Event;
};

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

export default function MyEventsCard({event }: MyEventsCardProps) {
  if (!event) {
    return <div className="my-events-card-error">No event data available</div>;
  }

  console.log(event);

  return (
    <Card className='my-events-card'>
      <div className="my-events-card-row">
        <h3>{ event.name }</h3>
        <NavigationIcons.ExternalLink className='my-events-card-row-link-icon' />
      </div>
      <span className='my-events-card-description'>
        { event.description }
      </span>
      <section className='my-events-card-info'>
        <span className='my-events-card-info-item'>
          <UserIcons.User className='my-events-card-info-icon-green' />
          { event.participants.length } Participants
        </span>
        <span className='my-events-card-info-item'>
          <InterfaceIcons.Calendar className='my-events-card-info-icon-blue' />
          { formatDate(event.exchangeDate) }
        </span>
        <span className='my-events-card-info-item'>
          <ChristmasIcons.Gift className='my-events-card-info-icon-purple' />
          ${ event.giftBudget } budget
        </span>
      </section>
      <footer className='my-events-card-footer'>
        <div className="row">
          <span>
            { 
              formatDate(event.createdAt)
            }
          </span>
        </div>
      </footer>
    </Card>
  );
}
