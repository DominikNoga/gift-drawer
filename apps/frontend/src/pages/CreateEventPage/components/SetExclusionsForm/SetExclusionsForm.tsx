import { useContext, useState } from "react";
import { CreateEventContext } from "../../store/CreateEventContext/CreateEventContext";
import type { SetExclusionsPayload } from "../../store/CreateEventContext/types/types";

export default function SetExclusionsForm() {
  const [exclusions, setExclusions] = useState<SetExclusionsPayload>([]);
  const { handleAddExclusions, createEventData } = useContext(CreateEventContext);

  return (
    <form onSubmit={(e) => handleAddExclusions(e, exclusions)}>
      <h1>Set exclusions</h1>
      <button type='submit'>Next step</button>
    </form>
  );
}
