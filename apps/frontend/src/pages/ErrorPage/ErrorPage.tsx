import { useRouteError } from 'react-router-dom';
import './ErrorPage.scss';

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  if (!error) {
    return (
      <ErrorPageWrapper>
        <h1>An unknown error occurred</h1>
      </ErrorPageWrapper>
    );
  }

  if (typeof error === typeof Error) {
    return (
      <ErrorPageWrapper>
        <h1>An error occurred</h1>
        <p>{(error as Error).message}</p>
      </ErrorPageWrapper>
    );
  }

  return (
    <ErrorPageWrapper>
      <h1>An error occurred!</h1>
      <p>{String(error)}</p>
    </ErrorPageWrapper>
  );
}

function ErrorPageWrapper({children}: {children: React.ReactNode}) {
  return (
    <main className="error-page">
      <div className="error-page-content">
        {children}
      </div>
    </main>
  );
}