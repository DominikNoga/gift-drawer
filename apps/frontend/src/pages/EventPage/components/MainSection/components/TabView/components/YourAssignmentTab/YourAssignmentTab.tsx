import { ChristmasIcons } from '@gd/shared/constants/icons';
import './YourAssignmentTab.scss';
import TabWithIconCentered from '../TabWithIconCentered/TabWithIconCentered';

type Props = {
  assignment?: string;
};

function NoAssignment() {
  return (
    <div className="no-assignment">
      <p>
        The organizer hasn&apos;t drawn names yet.
        You&apos;ll be able to see your assignment once the drawing is complete!
      </p>
    </div>
  );
}

export default function YourAssignmentTab({ assignment }: Props) {
  return (
    <TabWithIconCentered title="You are a secret santa for..." icon={<ChristmasIcons.Gift />}>
      {!assignment && <NoAssignment />}
      {assignment &&
        <div className="your-assignment-tab-result">
          <p>{assignment}</p>
        </div>
      }
    </TabWithIconCentered>
  );
}
