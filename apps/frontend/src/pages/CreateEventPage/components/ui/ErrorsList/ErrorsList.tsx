import './ErrorsList.scss';

type Props = {
  errors: string[];
};

export default function ErrorsList({ errors }: Props) {
  return (
    <ul className='event-create-form-errors-list'>
      {errors.map((error, index) => (
        <li key={index} className='event-create-form-errors-list-item' style={{whiteSpace: 'pre-line'}}>
          {error}
        </li>
      ))}
    </ul>
  );
}
