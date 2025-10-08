import { ChristmasIcons } from '@gd/shared/constants/icons';
import TabWithIconCentered from '../TabWithIconCentered/TabWithIconCentered';
import './WishlistTab.scss';
import Button from '@gd/shared/components/buttons/Button/Button';
import { useCallback, useEffect, useState } from 'react';
import AddItemForm from './components/AddItemForm/AddItemForm';
import { deleteWishlistItem, getParticipantWishlist } from '@gd/shared/services/wishes-services/wishes.service';
import type { WishlistItem } from '@gd/types/src/models/wish.model';
import WishlistItems from './components/WishlistItems/WishlistItems';

const subtitle = `Add items you'd love to receive to help your Secret Santa choose the perfect gift!`;

type Props = {
  currentParticipantId: string;
}

export default function WishlistTab({ currentParticipantId }: Props) {
  const [formVisible, setFormVisible] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const fetchWishlist = useCallback(async () => {
    const items = await getParticipantWishlist(currentParticipantId);
    setWishlistItems(items);
  }, [currentParticipantId]);

  useEffect(() => {
    fetchWishlist();
  }, [currentParticipantId, fetchWishlist]);

  const openForm = () => {
    setFormVisible(true);
  };

  const handleItemDelete = async (itemId: string) => {
    try {
      await deleteWishlistItem(itemId);
      setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
    }
  };

  const handleFormSubmit = () => {
    fetchWishlist();
    setFormVisible(false);
  };

  return (
    <TabWithIconCentered
      title='Your Wishlist'
      icon={<ChristmasIcons.Heart />}
      subtitle={subtitle}
    >
      <div className='wishlist-tab-content'>
        <header>
          <span>Wishlist Items ({wishlistItems.length})</span>
          <Button btnType='primary' onClick={openForm} className='add-item-button'>
            + Add Item
          </Button>
        </header>
        {
          formVisible &&
          <AddItemForm
            onCancel={() => setFormVisible(false)}
            afterSubmit={() => handleFormSubmit()}
            currentParticipantId={currentParticipantId}
          />
        }
        <WishlistItems items={wishlistItems} handleItemDelete={handleItemDelete} />
      </div>
    </TabWithIconCentered>
  );
}
