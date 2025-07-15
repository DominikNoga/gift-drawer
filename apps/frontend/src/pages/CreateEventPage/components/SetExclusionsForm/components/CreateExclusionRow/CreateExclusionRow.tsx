import './CreateExclusionRow.scss';
import SelectInput from '../SelectInput/SelectInput';

type Props = {
  participants: string[];
  index: number;
  values: [string?, string?];
};

export default function CreateExclusionRow({ participants, index, values }: Props) {

  return (
    <>
      <div className="set-exclusions-input-row">
        <SelectInput 
          options={participants}
          value={values[0]}
        />
        <span className='set-exclusions-input-row-text'>cannot draw</span>
        <SelectInput
          options={participants}
          value={values[1]}
        />
        <div className="set-exclusions-vice-versa">
          <input type='checkbox' id={`check-${index}`} />
          <label htmlFor={`check-${index}`}>and vice versa</label>
        </div>
      </div>

    </>
  );
}
