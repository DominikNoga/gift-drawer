import { useContext, useState } from "react";
import { CreateEventContext } from "../../store/CreateEventContext/CreateEventContext";
import type { SetExclusionsPayload } from "../../store/CreateEventContext/types/types";
import Button from "@gd/shared/components/buttons/Button/Button";

export default function SetExclusionsForm() {
  const [exclusions, setExclusions] = useState<SetExclusionsPayload>([]);
  const { handleAddExclusions, createEventData } = useContext(CreateEventContext);

  return (
    <form onSubmit={(e) => handleAddExclusions(e, exclusions)}>
      <h1>Set exclusions</h1>
      <Button
        className='event-create-form-btn'
        btnType='primary'
        type='submit'
      >
        Next step
      </Button>
    </form>
  );
}
