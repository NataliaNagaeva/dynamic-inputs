import { FormEvent, useEffect, useState } from "react";
import Input from "../Input";
import isEmailValid from "../../utils/isEmailValid";

enum DynamicFieldType {
  inputText = 'text',
  inputEmail = 'email',
  inputPassword = 'password'
}

type DynamicFieldTypeKeys = keyof typeof DynamicFieldType;
type DynamicFieldTypeValues = typeof DynamicFieldType[DynamicFieldTypeKeys];

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
  onFieldsInput: (fieldsValues: DynamicFieldsValues, fieldsErrors: DynamicFieldsErrors) => void
}

const DynamicFields = ({fieldsData, onFieldsInput}: DynamicFieldsProps) => {
  const [fieldsValues, setFieldsValues] = useState<DynamicFieldsValues>({});
  const [fieldsErrors, setFieldsErrors] = useState<DynamicFieldsErrors>({});

  useEffect(() => {
    const defaultValues: DynamicFieldsValues = {};
    const defaultErrors: DynamicFieldsErrors = {};

    fieldsData.forEach(fieldData => {
      let resultValue: DynamicFieldValue = '';
      let resultErrors: DynamicFieldErrors = [];

      if(fieldData.defaultValue) {
        resultValue = fieldData.defaultValue;
        resultErrors = getFieldErrors(fieldData.defaultValue, DynamicFieldType[fieldData.type], !!fieldData.required);
      } 

      defaultValues[fieldData.id] = resultValue;
      defaultErrors[fieldData.id] = resultErrors;
    });

    setFieldsValues(defaultValues);
    setFieldsErrors(defaultErrors);
  }, []);

  useEffect(() => {
    onFieldsInput(fieldsValues, fieldsErrors);
  }, [fieldsValues, fieldsErrors]);

  const onFieldInputHandle = (event: FormEvent<HTMLInputElement>) => {
    const { currentTarget: { name, value, type, required } } = event;
    const filedErrors = getFieldErrors(value, type as DynamicFieldTypeValues, required);

    setFieldsValues(prevValues => ({ ...prevValues, [name]: value }));
    setFieldsErrors(prevErrors => ({ ...prevErrors, [name]: filedErrors }))
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
        onInput={onFieldInputHandle}
      />
    )}
  </>
}

const getFieldErrors = (fieldValue: DynamicFieldValue, fieldType: DynamicFieldTypeValues, required: boolean) => {
  const errors: string[] = [];

  if(required && fieldValue === '') {
    errors.push('The field is required');
  }
  
  if(fieldType === 'email' && !isEmailValid(fieldValue)) {
    errors.push('Invalid email');
  }

  return errors;
}

export default DynamicFields;
