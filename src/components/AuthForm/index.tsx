import { FormEvent, useEffect, useState } from 'react';
import DynamicFields, { DynamicField, DynamicFieldTypeKeys } from '../DynamicFields';
import isEmailValid from '../../utils/isEmailValid';
import authFormData from './data.json';
import './AuthForm.scss';

interface AuthFormProps {
  config: DynamicField[];
  onSuccessAuth: VoidFunction;
}

type FormFieldsValues = Record<string, string>;
type FormFieldsErros = Record<string, string[]>;

const getFieldErrors = (fieldValue: string, fieldType: DynamicFieldTypeKeys, required = false) => {
  const errors: string[] = [];

  if(required && fieldValue === '') {
    errors.push('The field is required');
  }
  
  if(fieldType === 'inputEmail' && !isEmailValid(fieldValue)) {
    errors.push('Invalid email');
  }

  return errors;
}

const getFormErrors = (config: DynamicField[], formData: FormFieldsValues) => {
  const errors: FormFieldsErros = {};

  Object.entries(formData).forEach(([fieldName, fieldValue]) => {
    const validateField = config.find(item => item.id === fieldName);

    // Don't check if the field is unknown
    if(validateField === undefined) {
      return [true, []];
    }

    errors[fieldName] = getFieldErrors(fieldValue, validateField.type, validateField.required);
  });

  return errors;
}  

const getInvalidFields = (formErrors: FormFieldsErros) => 
  Object.entries(formErrors).filter(([_, fieldErrors]) => fieldErrors.length > 0);

const AuthForm = ({ config, onSuccessAuth }: AuthFormProps) => {
  const [formData, setFormData] = useState<FormFieldsValues>({});
  const [formErrors, setFormErrors] = useState<FormFieldsErros>({});

  useEffect(() => {
    setFormErrors(getFormErrors(config, formData));
  }, [formData, config]);

  const isFormValid = () => getInvalidFields(formErrors).length === 0

  const handleFieldsChange = (fieldsValues: FormFieldsValues) => {
    setFormData(fieldsValues);
  }  

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if(isFormValid()) {
      onSuccessAuth();
    }
  }

  return <form className="auth-form" onSubmit={handleFormSubmit} noValidate>
    <div className="auth-form__icon">
      <img src={authFormData.icon} alt="women" />
    </div>
    <h2>Authorization</h2>
    <span className="auth-form__description">Sign in to access your company's personal account</span>
    <div className="auth-form__fields">
      <DynamicFields fieldsData={config} fieldsErrors={formErrors} onFieldsChange={handleFieldsChange} />
    </div>
    <button
      className="auth-form__button"
      type="submit"
      disabled={!isFormValid()}
    >
      Sign In
    </button>
  </form>
}

export default AuthForm;
