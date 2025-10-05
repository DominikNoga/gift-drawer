import './YourAssignmentTab.scss';

type Props = {
  assignment?: string;
};

export default function YourAssignmentTab({ assignment }: Props) {
  return (
    <div className="your-assignment-tab">
      <h1>Your Assignment</h1>
      {assignment && <p>{assignment}</p>}
      {!assignment && <p>No assignment yet.</p>}
    </div>
  );
}
