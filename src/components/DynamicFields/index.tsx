import { FormEvent, useEffect, useRef, useState } from "react";
import Input from "../Input";
import generateClasses from "../../utils/generateClasses";
import './DynamicFields.scss';

enum DynamicFieldType {
  inputText = 'text',
  inputEmail = 'email',
  inputPassword = 'password'
}

export type DynamicFieldTypeKeys = keyof typeof DynamicFieldType;

export interface DynamicField {
  id: string;
  type: DynamicFieldTypeKeys;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}

type DynamicFieldId = DynamicField['id'];
type DynamicFieldValue = string;
type DynamicFieldErrors = string[];
type DynamicFieldsValues = Record<DynamicFieldId, DynamicFieldValue>;
type DynamicFieldsErrors = Record<DynamicFieldId, DynamicFieldErrors>;

interface DynamicFieldsProps {
  fieldsData: DynamicField[];
  fieldsErrors: DynamicFieldsErrors;
  onFieldsChange: (fieldsValues: DynamicFieldsValues) => void;
}

const dynamicFieldClasses = generateClasses('dynamic-field');

const DynamicFields = ({ 
  fieldsData, 
  fieldsErrors, 
  onFieldsChange
}: DynamicFieldsProps) => {
  const changingRef = useRef(false);
  const [fieldsValues, setFieldsValues] = useState<DynamicFieldsValues>({});

  useEffect(() => {
    const defaultValues = fieldsData.reduce<DynamicFieldsValues>((result, fieldData) => {
      result[fieldData.id] = fieldData.defaultValue || '';
      return result;
    }, {});

    setFieldsValues(defaultValues);
  }, [fieldsData]);

  useEffect(() => {
    onFieldsChange(fieldsValues);
  }, [fieldsValues, onFieldsChange]);

  const onFieldInputHandle = (event: FormEvent<HTMLInputElement>) => {
    const { currentTarget: { name, value } } = event;

    changingRef.current = true;
    setFieldsValues(prevValues => ({ ...prevValues, [name]: value }));
  }

  return <>
    {fieldsData.map(fieldData => {
      const {label, id, placeholder, type, required} = fieldData;

      return <label key={id} className={dynamicFieldClasses('', { required: !!required })}>
        <span className={dynamicFieldClasses('label')}>{label}</span>
        <Input
          className={dynamicFieldClasses('input')}
          name={id}
          placeholder={placeholder}
          required={required}
          type={DynamicFieldType[type]}
          valid={!changingRef.current || (fieldsErrors[id] && fieldsErrors[id].length === 0)}
          value={fieldsValues[id]}
          onChange={onFieldInputHandle}
        />
      </label>
    })}
  </>
}

export default DynamicFields;
