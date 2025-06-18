import './PageWrapper.scss';

export default function PageWrapper({children}: {children: React.ReactNode}) {
  return (
    <div className='page-container'>
      <div className='page-wrapper'>
        { children }
      </div>
    </div>
  );
}
