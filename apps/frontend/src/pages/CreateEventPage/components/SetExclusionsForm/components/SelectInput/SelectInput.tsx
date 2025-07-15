import './SelectInput.scss';
import type React from 'react';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
};

export default function SelectInput({ options, ...props }: Props) {
  return (
    <select {...props} className='select-input-field'>
      <option>Select a user</option>
      {
        options.map(option => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))
      }
    </select>
  );
}
