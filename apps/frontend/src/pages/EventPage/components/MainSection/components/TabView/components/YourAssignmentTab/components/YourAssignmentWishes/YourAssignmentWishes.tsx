import type { WishlistItem } from '@gd/types/src/models/wish.model';
import './YourAssignmentWishes.scss';
import WishlistItems from '../../../WishlistTab/components/WishlistItems/WishlistItems';

type Props = {
  wishlistItems: WishlistItem[];
  drawnParticipantName: string;
};

export default function YourAssignmentWishes({ wishlistItems, drawnParticipantName }: Props) {
  return (
    <div className="your-assignment-wishes">
      <h3 className='your-assignment-wishes-title'>{drawnParticipantName}&apos;s Wishlist</h3>
      <WishlistItems items={wishlistItems} drawnParticipantName={drawnParticipantName} />
    </div>
  );
}
