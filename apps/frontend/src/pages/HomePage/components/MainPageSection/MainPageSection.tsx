import './MainPageSection.scss';

type Props = {
  children?: React.ReactNode;
  title: React.ReactNode;
  id?: string;
};
export default function MainPageSection({ children, title, id }: Props) {
  return (
    <section id={id} className="main-page-section">
      <span className="main-page-section-title">{title}</span>
      {children}
    </section>
  );
}
