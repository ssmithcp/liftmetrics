import { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import config from '../../util/config'
import { register } from '../../actions/user'

import Input from '../form/Input'
import SafeExternalLink from '../navigation/SafeExternalLink'
import InternalLink from '../navigation/InternalLink'

import MediumWidth from '../container/MediumWidth'
import routes from '../navigation'
import SubmitButton from '../form/SubmitButton'

// TODO submit form on enter on password

const SignUp = ({ isLoggedIn, register }) => {
  const [showPassword, setShowPassword] = useState(true)

  const toggleShowPassword = e => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const defaultState = config.isDev
    ? {
      firstName: 'Scott',
      lastName: 'Smith',
      email: `ss${ Date.now() }@gmail.com`,
      password: `${ uuid() }`,
    }
    : {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  const [formData, setFormData] = useState(defaultState)
  const [submitEnabled, setSubmitEnabled] = useState(true)

  if (isLoggedIn) {
    return <Redirect to={ routes.home.path } />
  }

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    setSubmitEnabled(false)

    register(formData)
      .catch(() => setSubmitEnabled(true))
  }

  return (
    <MediumWidth title='Sign Up' className='text-center'>
      <p className='mb-2'>
        Already have an account? <InternalLink route={ routes.login } />
      </p>
      <form
        className='flex flex-col'
        onSubmit={ onSubmit }
      >
        <Input
          required
          type='text'
          placeholder='First name'
          name='firstName'
          value={ formData.firstName }
          minLength='3'
          maxLength='50'
          onChange={ onChange }
        />
        <Input
          required
          type='text'
          placeholder='Last name'
          name='lastName'
          value={ formData.lastName }
          minLength='1'
          maxLength='50'
          onChange={ onChange }
        />
        <Input
          required
          minLength='7'
          maxLength='120'
          type='email'
          placeholder='Email address*'
          name='email'
          value={ formData.email }
          onChange={ onChange }
        />
        <div>
          <button
            className='text-right text-primary focus:outline-none p-2 -my-2 float-right z-10'
            onClick={ toggleShowPassword }
            tabIndex='-1'
          >
            { showPassword ? 'Show' : 'Hide' }
          </button>
          <Input
            required
            minLength='7'
            maxLength='50'
            type={ showPassword ? 'password' : 'text' }
            placeholder='Password'
            name='password'
            autoComplete='false'
            className='block w-full'
            value={ formData.password }
            onChange={ onChange }
          />
        </div>
        <SubmitButton
          value='Create account'
          disabled={ !submitEnabled }
        />
      </form>
      <p className='text-sm'>
        * Your avatar is sourced from <SafeExternalLink to='https://gravatar.com' tabIndex='-1'>gravatar.com</SafeExternalLink> using this email
      </p>
    </MediumWidth>
  )
}

const mapStateToProps = state =>({
  isLoggedIn: state.profile !== null
})

export default connect(mapStateToProps, { register })(SignUp)
