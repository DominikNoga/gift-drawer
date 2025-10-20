import FormSubtitle from '../FormSubtitle/FormSubtitle';
import './FormHeader.scss';

type Props = {
  title: string;
  subtitle?: string;
};

export default function FormHeader({ title, subtitle }: Props) {
  return (
    <header className='form-header'>
      <h3>{title}</h3>
      {subtitle && <FormSubtitle>{subtitle}</FormSubtitle>}
    </header>
  );
} 