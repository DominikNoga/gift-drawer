import { colors } from "@gd/shared/constants/colors";
import { ChristmasIcons, InterfaceIcons, UserIcons } from "@gd/shared/constants/icons";

export const STEPS = [
  {
    title: 'Create Your Event',
    description:
      'Set up your Secret Santa event by entering basic details like event name, gift budget, and exchange date. Add participants by their names and emails. You can also set exclusions to ensure certain people don’t get matched together.',
    icon: <UserIcons.AddUser />,
    color: colors.blue[600],
  },
  {
    title: 'Send Join Codes',
    description:
      'After creating the event, each participant gets a unique join code. Use the copy code button in your organizer dashboard to easily share codes with participants via email, text, or your preferred messaging app.',
    icon: <InterfaceIcons.Send />,
    color: colors.purple[600]
  },
  {
    title: 'Draw Assignments',
    description:
      'Once everyone has joined and the event is ready, press the "Draw Assignments" button. Our smart algorithm will randomly assign each participant a Secret Santa match while respecting all exclusion rules.',
    icon: <ChristmasIcons.Shuffle />,
    color: colors.red[600]
  },
  {
    title: 'Reveal Your Match',
    description:
      'After the draw, participants can log in with their join code to reveal who they’re buying for. The assignment is kept secret and only visible to each individual participant.',
    icon: <InterfaceIcons.Preview />,
    color: colors.green[600]
  },
  {
    title: 'Add a Wishlist',
    description:
      'Participants can add their gift preferences and wishlist items to help their Secret Santa pick the perfect gift. This ensures everyone gets something they’ll love while keeping the surprise element intact.',
    icon: <ChristmasIcons.Wishlist />,
    color: colors.amber[600]
  }
];
