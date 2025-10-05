import './CreateExclusionRow.scss';
import SelectInput from '../SelectInput/SelectInput';

type Props = {
  participants: string[];
  index: number;
  values: [string?, string?];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number, input: 0 | 1) => void;
  handleViceVersaChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  isViceVersaChecked?: boolean;
};

export default function CreateExclusionRow({ participants, index, values, handleChange, handleViceVersaChange, isViceVersaChecked }: Props) {

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
          <input type='checkbox' id={`check-${index}`} onChange={(e) => handleViceVersaChange(e, index)} checked={isViceVersaChecked} />
          <label htmlFor={`check-${index}`}>and vice versa</label>
        </div>
      </div>

    </>
  );
}
