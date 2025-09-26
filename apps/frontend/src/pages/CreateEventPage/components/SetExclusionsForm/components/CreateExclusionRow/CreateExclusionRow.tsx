import './CreateExclusionRow.scss';
import SelectInput from '../SelectInput/SelectInput';

type Props = {
  participants: string[];
  index: number;
  values: [string?, string?];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number, input: 0 | 1) => void;
};

export default function CreateExclusionRow({ participants, index, values, handleChange }: Props) {

  return (
    <>
      <div className="set-exclusions-input-row">
        <SelectInput 
          options={participants}
          value={values[0]}
          onChange={(e) => handleChange(e, index, 0)}
        />
        <span className='set-exclusions-input-row-text'>cannot draw</span>
        <SelectInput
          options={participants}
          value={values[1]}
          onChange={(e) => handleChange(e, index, 1)}
        />
        <div className="set-exclusions-vice-versa">
          <input type='checkbox' id={`check-${index}`} />
          <label htmlFor={`check-${index}`}>and vice versa</label>
        </div>
      </div>

    </>
  );
}
