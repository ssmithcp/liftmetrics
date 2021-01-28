import { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../actions/auth'

import Template from './Template'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import InternalLink from '../util/InternalLink'
import routes from '../navbar'

const Login = ({ isLoggedIn, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [submitEnabled, setSubmitEnabled] = useState(true)

  const onChange = useCallback(
    e => setFormData({ ...formData, [e.target.name]: e.target.value }),
    [formData]
  )

  const onSubmit = useCallback(e => {
      e.preventDefault()
      setSubmitEnabled(false)

      login(formData)
        .catch(() => setSubmitEnabled(true))
    },
    [formData, login]
  )

  if (isLoggedIn) {
    return <Redirect to={ routes.home.path } />
  }

  return (
    <Template title='Login'>
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
        />
        <div className='text-center my-6'>
          <SubmitButton
            className='py-4 w-full md:w-2/4 '
            value='Login'
            disabled={ !submitEnabled }
          />
        </div>
      </form>
    </Template>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.profile !== null,
})

export default connect(mapStateToProps, { login })(Login)
