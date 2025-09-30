import './Card.scss';

type CardProps = { 
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Card({ children, className = undefined, onClick }: CardProps) {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {
        children
      }
    </div>
  );
}
