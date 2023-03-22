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
  onChange?: FormEventHandler<HTMLInputElement>
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
  onChange }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [classes, setClasses] = useState(generateInputClasses(valid, className));

  useEffect(() => {
    setClasses(generateInputClasses(valid, className));
  }, [valid, className]);

  
  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    if (onChange !== undefined && typeof onChange === 'function') {
      onChange(event);
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
      onChange={handleOnChange}
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
