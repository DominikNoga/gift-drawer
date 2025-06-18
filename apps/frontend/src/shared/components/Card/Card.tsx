import './Card.scss';

type CardProps = { 
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = undefined }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {
        children
      }
    </div>
  );
}
