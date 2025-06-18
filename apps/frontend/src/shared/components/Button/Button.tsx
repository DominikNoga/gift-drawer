import './Button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  btnType: 'primary' | 'secondary' | 'tertiary';
};

export default function Button(props: ButtonProps) {
  return (
    <button {...props} className={`btn btn-${props.btnType} ${props.className || ''}`}>
      {
        props.children
      }
    </button>
  );
}
