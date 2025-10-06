import { ChristmasIcons } from '@gd/shared/constants/icons';
import TabWithIconCentered from '../TabWithIconCentered/TabWithIconCentered';
import './WishlistTab.scss';
import Button from '@gd/shared/components/buttons/Button/Button';
import { useState } from 'react';
import AddItemForm from './components/AddItemForm/AddItemForm';

const subtitle = `Add items you'd love to receive to help your Secret Santa choose the perfect gift!`;

export default function WishlistTab() {
  const [formVisible, setFormVisible] = useState(false);
  
  const openForm = () => {
    setFormVisible(true);
  };

  return (
    <TabWithIconCentered
      title='Your Wishlist'
      icon={<ChristmasIcons.Heart />}
      subtitle={subtitle}
    >
      <div className='wishlist-tab-content'>
        <header>
          <span>Wishlist Items (0)</span>
          <Button btnType='primary' onClick={openForm} className='add-item-button'>
            + Add Item
          </Button>
        </header>
        {formVisible && <AddItemForm onCancel={() => setFormVisible(false)} />}
      </div>
    </TabWithIconCentered>
  );
}
