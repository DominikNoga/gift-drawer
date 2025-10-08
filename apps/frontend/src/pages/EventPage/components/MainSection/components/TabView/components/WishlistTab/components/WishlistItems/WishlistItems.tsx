import type { WishlistItem } from '@gd/types/src/models/wish.model';
import './WishlistItems.scss';
import { ChristmasIcons, NavigationIcons } from '@gd/shared/constants/icons';
import SquareIcon from '@gd/shared/components/icons/SquareIcon/SquareIcon';
import { colors } from '@gd/shared/constants/colors';

type Props = {
  items: WishlistItem[];
  handleItemDelete: (itemId: string) => void;
}

export default function WishlistItems({ items, handleItemDelete }: Props) {
  return (
    <div className="wishlist-items">
      {items.length === 0 && <EmptyListMessage />}
      {items.length > 0 && items.map(item => (
        <div key={item.id} className="wishlist-item">
          <SquareIcon
            icon={<ChristmasIcons.Star />}
            backgroundColor={colors.amber[100]}
            iconColor={colors.amber[600]}
            size={2.5}
          />
          <div className='wishlist-item-info'>
            <span className='wishlist-item-title'>{item.name}</span>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                className='wishlist-item-link'
                rel="noopener noreferrer"
              >
                <NavigationIcons.ExternalLink /> View Item online
              </a>
            )}
          </div>

          <button className='wishlist-item-delete-btn' title='Delete Item' onClick={() => handleItemDelete(item.id)}>
            <NavigationIcons.Delete />
          </button>
        </div>
      ))}
    </div>
  );
}

function EmptyListMessage() {
  return (
    <div className="empty-list-message">
      <ChristmasIcons.Gift />
      <h4>No wishlist items yet</h4>
      <p>
        Add your first item to help your Secret Santa choose the perfect gift!
      </p>
    </div>
  );
}
