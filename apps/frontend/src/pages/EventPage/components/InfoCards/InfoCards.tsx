import { InterfaceIcons, UserIcons } from '@gd/shared/constants/icons';
import './InfoCards.scss';
import InfoCard from './components/InfoCard/InfoCard';
import { colors } from '@gd/shared/constants/colors';
import SquareIcon from '@gd/shared/components/icons/SquareIcon/SquareIcon';
import { useEventPageContext } from '../../providers/EventPageContextProvider/EventPageContextProvider';

const ICON_SIZE = 2.25;

export default function InfoCards() {
  const { event } = useEventPageContext();
  const { organizerName, location, giftBudget, exchangeDate: eventDate } = event;
  
  const cardsData = [
    {
      value: organizerName,
      label: 'Organized by',
      icon: <SquareIcon
        icon={<UserIcons.User />}
        backgroundColor={colors.blue[100]}
        iconColor={colors.blue[600]}
        size={ICON_SIZE}
      />,
    },
    {
      value: location ?? 'To be decided',
      label: 'Event location',
      icon: <SquareIcon
        icon={<InterfaceIcons.Location />}
        backgroundColor={colors.green[100]}
        iconColor={colors.green[600]}
        size={ICON_SIZE}
      />,
    },
    {
      value: eventDate ?? 'To be decided',
      label: 'Event Date',
      icon: <SquareIcon
        icon={<InterfaceIcons.Calendar />}
        iconColor={colors.purple[600]}
        backgroundColor={colors.purple[100]}
        size={ICON_SIZE}
      />,
    },
    {
      value: giftBudget ? `$${giftBudget}` : 'No limit 😉',
      label: 'Gift Budget',
      icon: <SquareIcon
        icon={<InterfaceIcons.Money />}
        iconColor={colors.amber[600]}
        backgroundColor={colors.amber[100]}
        size={ICON_SIZE}
      />,
    }
  ];
  return (
    <section className='event-page-info-cards'>
      {cardsData.map((card) => (
        <InfoCard key={card.label} {...card} />
      ))}
    </section>
  );
}
