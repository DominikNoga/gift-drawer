import type React from 'react';
import './AddItemForm.scss';
import Input from '@gd/shared/components/Input/Input';
import Button from '@gd/shared/components/buttons/Button/Button';
import { useState } from 'react';
import type { WishlistItem } from '@gd/types/src/models/participants.model';

type Props = {
  onCancel: () => void;
}

export default function AddItemForm({ onCancel }: Props) {
  const [wishlistItem, setWishlistItem] = useState<WishlistItem>({ name: '', link: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
