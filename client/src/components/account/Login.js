import { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../actions/user'

import MediumWidth from '../container/MediumWidth'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import InternalLink from '../navigation/InternalLink'
import routes from '../navigation'

const Login = ({ isLoggedIn, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [submitEnabled, setSubmitEnabled] = useState(true)

  if (isLoggedIn) {
    return <Redirect to={ routes.home.path } />
  }

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    setSubmitEnabled(false)

    login(formData)
      .catch(() => setSubmitEnabled(true))
  }

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
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.profile !== null,
})

export default connect(mapStateToProps, { login })(Login)
