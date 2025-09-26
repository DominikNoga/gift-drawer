import './Button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  btnType: 'primary' | 'secondary' | 'tertiary';
};

export default function Button({btnType, ...props}: ButtonProps) {
  return (
    <button {...props} className={`btn btn-${btnType} ${props.className || ''}`}>
      {
        props.children
      }
    </button>
  );
}
