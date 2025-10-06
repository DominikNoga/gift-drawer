import { drawAssignments } from '@gd/shared/services/events-services/events.service';
import './DrawNamesTab.scss';
import TabWithIconCentered from '../TabWithIconCentered/TabWithIconCentered';
import { ChristmasIcons } from '@gd/shared/constants/icons';

export default function DrawNamesTab({ eventId }: { eventId: string }) {
  const onDrawAssignments = async () => {
    try {
      const result = await drawAssignments(eventId);
      console.log(result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error drawing assignments:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <TabWithIconCentered title='Ready to Draw Names?' icon={<ChristmasIcons.Shuffle />}>
      <span className='draw-names-info'>
        Keep in mind that once you draw names, the assignments cannot be changed. And you won&apos;t be able to
        add more participants or set other exclusions after the draw.
      </span>
      <button className="draw-assignments-button" onClick={onDrawAssignments}>
        Draw Assignments
      </button>
    </TabWithIconCentered>
  );
}
