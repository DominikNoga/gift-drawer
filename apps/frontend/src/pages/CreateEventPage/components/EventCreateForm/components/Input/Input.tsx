/* eslint-disable react/prop-types */
import './Input.scss';
import React, { useRef, type ReactElement } from 'react';
import { isDateInput } from './utils/Input.utils';


type InputProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  isTextarea?: boolean;
  label: string;
  classes?: string;
  id: string;
  icon?: ReactElement;
};

export default function Input({ label, isTextarea = false, classes = '', icon, ...props }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const focusInput = () => {
    if (isTextarea) {
      textareaRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="input-group">
      <label className='input-group-label' htmlFor={props.id}>
          {icon}
          {label}
          {props.required ? ' *' : ' (Optional)'}
      </label>
      {isTextarea ? (
        <textarea
          ref={textareaRef}
          className={'input-field' + classes}
          {...props}
          placeholder=" "
        />
      ) : (
        <input
          ref={inputRef}
          className={'input-field' + classes}
          {...props}
          placeholder=" "
        />
      )}
      {
        !props.value && !isDateInput(props.type) && props.placeholder &&
        <span className="input-placeholder" onClick={focusInput}>
          {props.placeholder}
        </span>
      }
    </div>
  );
}
