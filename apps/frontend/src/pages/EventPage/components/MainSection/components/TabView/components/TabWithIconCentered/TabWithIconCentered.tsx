import './TabWithIconCentered.scss';

type Props = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function TabWithIconCentered({ title, icon, children }: Props) {
  return (
    <div className='tab-content-wrapper'>
      <div className="tab-content">
        <div className='tab-content-header'>
          <div className="tab-content-header-icon">
            {icon}
          </div>
          <span className='tab-content-header-title'>{title}</span>
        </div>
        {
          children
        }
      </div>
    </div>
  );
}
