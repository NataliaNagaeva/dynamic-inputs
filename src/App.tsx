import AuthForm from './components/AuthForm';
import { DynamicField } from './components/DynamicFields';
import './App.scss';

const config: DynamicField[] = [
  {
    id: 'first_name',
    type: 'inputText',
    label: 'First Name',
    defaultValue: 'Some first name',
    placeholder: 'Введите имя'
  },
 {
    id:  'last_name',
    type: 'inputText',
    label: 'Last Name',
    placeholder: 'Введите фамилию'
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
    placeholder: 'Введите пароль'
  },
];

const App = () => {
  return (
    <div className="app">
      <AuthForm config={config} />
    </div>
  );
}

export default App;
