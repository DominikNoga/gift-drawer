import type React from 'react';
import './AddItemForm.scss';
import Input from '@gd/shared/components/Input/Input';
import Button from '@gd/shared/components/buttons/Button/Button';
import { useState } from 'react';
import { addWishlistItem } from '@gd/shared/services/wishes-services/wishes.service';

type Props = {
  onCancel: () => void;
  currentParticipantId: string;
  afterSubmit: () => void;
}

type WishlistItem = {
  name: string;
  link?: string;
}

export default function AddItemForm({ onCancel, currentParticipantId, afterSubmit }: Props) {
  const [wishlistItem, setWishlistItem] = useState<WishlistItem>({ name: '' });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addWishlistItem({
        participantId: currentParticipantId,
        ...wishlistItem,
      });
      console.log('Wishlist item added:');
      console.log(result);
      afterSubmit();
    } catch (error) {
      console.error('Error adding wishlist item:', error);
    }
  };

  return (
    <form className='add-item-form' onSubmit={onSubmit}>
      <Input 
        type='text'
        label='Item Name'
        id='item-name'
        placeholder='e.g., Book, Board Game, Gift Card...'
        value={wishlistItem?.name || ''}
        onChange={(e) => setWishlistItem({ ...wishlistItem, name: e.target.value })}
        required 
      />
      <Input
        type='url'
        label='Link'
        id='item-link'
        value={wishlistItem?.link || ''}
        onChange={(e) => setWishlistItem({ ...wishlistItem, link: e.target.value })}
        placeholder='e.g., https://example.com/item'
      />
      <div className="add-item-form-buttons">
        <Button btnType='primary' type='submit'>
          Add to Wishlist
        </Button>
        <Button btnType='transparent' type='button' onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
