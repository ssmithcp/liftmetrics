import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login, LoginFields } from 'actions/user';

import MediumWidth from 'components/container/MediumWidth';
import Input from 'components/form/Input';
import SubmitButton from 'components/form/SubmitButton';

import InternalLink from 'components/navigation/InternalLink';
import routes from 'components/navigation';
import { RootState } from 'store';

interface LoginProps {
  isLoggedIn: boolean;
  login: (input: LoginFields) => Promise<void>;
}

const Login = ({ isLoggedIn, login }: LoginProps) => {
  const [formData, setFormData] = useState<LoginFields>({
    email: '',
    password: ''
  });
  const [submitEnabled, setSubmitEnabled] = useState(true);

  if (isLoggedIn) {
    return <Redirect to={ routes.home.path } />;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitEnabled(false);

    login(formData)
      .catch(() => setSubmitEnabled(true));
  };

  return (
    <MediumWidth title='Login' className='text-center'>
      <p className='mb-2'>
        Don't have an account yet? <InternalLink route={ routes.signUp } />
      </p>
      <form
        className='flex flex-col'
        onSubmit={ onSubmit }
      >
        <Input
          required
          minLength='7'
          maxLength='120'
          type='email'
          placeholder='Email address'
          name='email'
          value={ formData.email }
          onChange={ onChange }
          className='my-3'
        />
        <Input
          required
          minLength='6'
          maxLength='50'
          placeholder='Password'
          name='password'
          type='password'
          autoComplete='false'
          value={ formData.password }
          onChange={ onChange }
          className='my-3'
        />
        <SubmitButton
          value='Login'
          disabled={ !submitEnabled }
        />
      </form>
    </MediumWidth>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.profile !== null,
});

export default connect(mapStateToProps, { login })(Login);
