import { FormEvent, FormEventHandler, RefObject, useEffect, useRef, useState } from "react";
import triggerNativeEventFor from "../../utils/triggerNativeEventFor";
import './Input.scss';

type InputType = 'email' | 'password' | 'text';

interface InputProps {
  name: string;
  type: InputType;
  className?: string;
  clearable?: boolean;
  placeholder?: string;
  required?: boolean;
  valid?: boolean;
  value?: string;
  onInput?: FormEventHandler<HTMLInputElement>
}

const Input = ({ 
  name, 
  type, 
  value='',
  clearable=true,
  className = '', 
  placeholder='', 
  required = false, 
  valid = true,  
  onInput }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [classes, setClasses] = useState(generateInputClasses(valid, className));

  useEffect(() => {
    setClasses(generateInputClasses(valid, className));
  }, [valid, className]);

  
  const handleOnInput = (event: FormEvent<HTMLInputElement>) => {
    if (onInput !== undefined && typeof onInput === 'function') {
      onInput(event);
    } 
  }

  return <div className="input-wrapper">
    <input     
      ref={inputRef} 
      className={classes}
      name={name} 
      placeholder={placeholder} 
      required={required}
      type={type} 
      value={value}
      onInput={handleOnInput}
    />
    {clearable && value !== '' && <div className="input-clear" onClick={() => {
      if(inputRef !== null) {
        triggerNativeEventFor(inputRef.current as HTMLInputElement, { event: 'input', value: '' });
      }
    }}>x</div>}
  </div>
}

const generateInputClasses = (isValid: boolean, additionalClassName: string) => {
  const classes = ['input'];

  if(!isValid) {
    classes.push('input--invalid');
  }

  if(additionalClassName) {
    classes.push(additionalClassName);
  }

  return classes.join(' ');
}

export default Input;
