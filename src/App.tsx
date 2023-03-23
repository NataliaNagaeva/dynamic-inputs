import { useState } from 'react';
import AuthForm from './components/AuthForm';
import { DynamicField } from './components/DynamicFields';
import './App.scss';

const config: DynamicField[] = [
  {
    id: 'first_name',
    type: 'inputText',
    label: 'First Name',
    defaultValue: 'Some first name',
    placeholder: 'Enter the name'
  },
 {
    id:  'last_name',
    type: 'inputText',
    label: 'Last Name'
  },
  {
    id: 'email',
    type: 'inputEmail',
    label: 'Email',
    required: true,
    placeholder: 'someemail@example.com'
  },
  {
    id: 'password',
    type: 'inputPassword',
    label: 'Password',
    required: true,
    placeholder: 'Enter the password'
  },
];

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const onSuccessAuth = () => {
    setIsAuth(true);
  }

  return (
    <div className="app">
      { !isAuth ? <AuthForm config={config} onSuccessAuth={onSuccessAuth} /> : "You are signed in!" }
    </div>
  );
}

export default App;
