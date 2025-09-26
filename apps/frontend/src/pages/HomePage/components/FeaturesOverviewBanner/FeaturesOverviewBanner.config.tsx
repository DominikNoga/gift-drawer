import SquareIcon from "@gd/shared/components/icons/SquareIcon/SquareIcon";
import type { FeatureInfoProps } from "./components/FeatureInfo/FeatureInfo";
import { ChristmasIcons, NavigationIcons, UserIcons } from "@gd/shared/constants/icons";
import { colors } from "@gd/shared/constants/colors";

const ICON_SIZE = 3;

export const FEATURES_OVERVIEW_CONFIG: FeatureInfoProps[] = [
  {
    icon: <SquareIcon 
      icon={<UserIcons.Users />}
      backgroundColor={colors.blue[100]}
      iconColor={colors.blue[600]}
      size={ICON_SIZE}
    />,
    title: 'Easy Participation',
    description: 'Share join links or codes for effortless participant registration'
  },
  {
    icon: <SquareIcon 
      icon={<ChristmasIcons.Gift />}
      backgroundColor={colors.purple[100]}
      iconColor={colors.purple[600]}
      size={ICON_SIZE}
    />,
    title: 'Smart Exclusions',
    description: 'Set exclusion rules to prevent unwanted gift assignments'
  },
  {
    icon: <SquareIcon 
      icon={<NavigationIcons.Search />}
      backgroundColor={colors.green[100]}
      iconColor={colors.green[600]}
      size={ICON_SIZE}
    />,
    title: 'Fair & Random',
    description: 'Advanced algorithm ensures fair and completely random assignments'
  }
];
