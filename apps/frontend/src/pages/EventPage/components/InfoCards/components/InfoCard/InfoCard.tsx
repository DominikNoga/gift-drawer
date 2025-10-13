import './InfoCard.scss';
import Card from "@gd/shared/components/Card/Card";

type Props = {
  value: string | number;
  label: string;
  icon: React.ReactNode;
};

export default function InfoCard({ value, label, icon }: Props) {
  return (
    <Card className="event-page-info-card">
      {icon}
      <div>
        <span className="event-page-info-card-label">{label}</span>
        <span className="event-page-info-card-value">{value}</span>
      </div>
    </Card>
  );
}
