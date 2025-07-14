import './ErrorsList.scss';
import React from 'react'

type Props = {
  errors: string[];
};

export default function ErrorsList({ errors }: Props) {
  return (
    <ul className='event-create-form-errors-list'>
      {errors.map((error, index) => (
        <li key={index} className='event-create-form-errors-list-item'>
          {error}
        </li>
      ))}
    </ul>
  );
}
