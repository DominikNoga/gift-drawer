import './PageLoading.scss';

type Props = {
  text: string;
};

export default function PageLoading({ text }: Props) {
  return (
    <div className="page-loading-wrapper">
      <div className="page-loading-spinner" />
      <div className="page-loading-text">{text}</div>
    </div>
  );
}
