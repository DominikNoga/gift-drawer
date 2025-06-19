import './FeatureInfo.scss';

export type FeatureInfoProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function FeatureInfo({icon, title, description}: FeatureInfoProps) {
  return (
    <div className='feature-info'>
      { icon }
      <h3 className='feature-info-title'>{ title }</h3>
      <p className='feature-info-description'>{ description }</p>
    </div>
  );
}
