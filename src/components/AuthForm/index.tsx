import { useEffect, useState } from 'react';
import DynamicFields, {DynamicField} from '../DynamicFields';
import authFormData from './data.json';
import './AuthForm.scss';

interface AuthFormProps {
  config: DynamicField[];
}

type FormFieldsValues = Record<string, string>;
type FormFieldsErros = Record<string, string[]>;

const getInvalidFields = (formErrors: FormFieldsErros) => 
  Object.entries(formErrors).filter(([_, fieldErrors]) => fieldErrors.length > 0);

const AuthForm = ({ config }: AuthFormProps) => {
  const [formData, setFormData] = useState<FormFieldsValues>({});
  const [formErrors, setFormErrors] = useState<FormFieldsErros>({});

  useEffect(() => {
    console.log(getInvalidFields(formErrors));
    // console.log(formData, formErrors);
  }, [formData, formErrors]);

  const onFieldsInput = (fieldsValues: FormFieldsValues, fieldsErrors: FormFieldsErros) => {
    setFormData(fieldsValues);
    setFormErrors(fieldsErrors);
  }

  return <form className="auth-form">
    <div className="auth-form__icon">
      <img src={authFormData.icon} alt="women" />
    </div>
    <h2>Authorization</h2>
    <span className="auth-form__description">Sign in to access your company's personal account</span>
    <div className="auth-form__fields">
      <DynamicFields onFieldsInput={onFieldsInput} fieldsData={config} />
    </div>
    <button
      className="auth-form__button"
      type="submit"
      disabled={getInvalidFields(formErrors).length !== 0}
    >
      Sign In
    </button>
  </form>
}

export default AuthForm;
