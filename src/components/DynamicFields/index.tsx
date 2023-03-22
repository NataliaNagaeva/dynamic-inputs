import { FormEvent, useEffect, useState } from "react";
import Input from "../Input";

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

const DynamicFields = ({ 
  fieldsData, 
  fieldsErrors, 
  onFieldsChange
}: DynamicFieldsProps) => {
  const [fieldsValues, setFieldsValues] = useState<DynamicFieldsValues>({});

  useEffect(() => {
    const defaultValues: DynamicFieldsValues = {};

    fieldsData.forEach(fieldData => {
      let resultValue: DynamicFieldValue = '';

      if(fieldData.defaultValue) {
        resultValue = fieldData.defaultValue;
      } 

      defaultValues[fieldData.id] = resultValue;
    });

    setFieldsValues(defaultValues);
  }, [fieldsData]);

  useEffect(() => {
    onFieldsChange(fieldsValues);
  }, [onFieldsChange, fieldsValues]);

  const onFieldInputHandle = (event: FormEvent<HTMLInputElement>) => {
    const { currentTarget: { name, value } } = event;

    setFieldsValues(prevValues => ({ ...prevValues, [name]: value }));
  }

  return <>
    {fieldsData.map(fieldData => 
      <Input 
        key={fieldData.id}
        name={fieldData.id}
        placeholder={fieldData.label}
        required={fieldData.required}
        type={DynamicFieldType[fieldData.type]}
        valid={fieldsErrors[fieldData.id] && fieldsErrors[fieldData.id].length === 0}
        value={fieldsValues[fieldData.id]}
        onChange={onFieldInputHandle}
      />
    )}
  </>
}

export default DynamicFields;
