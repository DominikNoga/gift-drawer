import './Description.scss';
import Card from '@gd/shared/components/Card/Card';
import { useEventPageContext } from '../../providers/EventPageContextProvider/EventPageContextProvider';

export default function Description() {
  const { event } = useEventPageContext();

  return (
    <Card>
      <pre className="description-pre">{event.description}</pre>
    </Card>
  );
}
