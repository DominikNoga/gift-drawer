import { ChristmasIcons, InterfaceIcons, UserIcons } from '@gd/shared/constants/icons';
import './InfoCards.scss';
import InfoCard from './components/InfoCard/InfoCard';
import { colors } from '@gd/shared/constants/colors';
import SquareIcon from '@gd/shared/components/icons/SquareIcon/SquareIcon';

type Props = {
  participantsQuantity: number;
  assignedQuantity: number;
  joinCode: string;
};

const ICON_SIZE = 2.25;

export default function InfoCards({ participantsQuantity, assignedQuantity, joinCode }: Props) {
  // 
  const cardsData = [
    {
      value: participantsQuantity,
      label: 'Participants',
      icon: <SquareIcon
        icon={<UserIcons.Users />}
        backgroundColor={colors.blue[100]}
        iconColor={colors.blue[600]}
        size={ICON_SIZE}
      />,
    },
    {
      value: assignedQuantity,
      label: 'Assigned',
      icon: <SquareIcon
        icon={<ChristmasIcons.Gift />}
        backgroundColor={colors.green[100]}
        iconColor={colors.green[600]}
        size={ICON_SIZE}
      />,
    },
    {
      value: joinCode,
      label: 'Join Code',
      icon: <SquareIcon
        icon={<InterfaceIcons.Link />}
        iconColor={colors.purple[600]}
        backgroundColor={colors.purple[100]}
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
