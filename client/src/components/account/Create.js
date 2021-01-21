import React from 'react'

import Input from '../util/Input'
import SafeExternalLink from '../util/SafeExternalLink'
import InternalLink from '../util/InternalLink'

import routes from '../nav'
import SubmitButton from '../util/SubmitButton'

const focusStyle = ''

const Create = () => {
  const [showPassword, setShowPassword] = React.useState(true)

  const onSubmit = () => {
    console.log('submitted!')
  }

  const toggleShowPassword = e => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <div className='mx-auto text-center md:w-750px'>
      <h1 className='text-2xl mb-4'>Sign Up</h1>
      <p>
        Already have an account? <InternalLink to={ routes.login.path }>{ routes.login.title }</InternalLink>
      </p>
      <form
        className='flex flex-col'
        onSubmit={ onSubmit }
      >
        <Input type='text' placeholder='First name' name='firstName' required />
        <Input type='text' placeholder='Last name' name='Last Name' required />
        <Input type='email' placeholder='Email address*' name='email' required />
        <div>
          <button
            className='text-right text-primary focus:outline-none p-2 -my-2 float-right z-10'
            onClick={ toggleShowPassword }
            tabIndex='-1'
          >
            { showPassword ? 'Show' : 'Hide' }
          </button>
          <Input
            type={ showPassword ? 'password' : 'text' }
            placeholder='Password'
            name='password'
            minLength='6'
            autoComplete='false'
            className='block w-full'
          />
        </div>
        <div className='text-center my-6'>
          <SubmitButton
            className='py-4 w-full md:w-2/4 '
            value='Create account'
          />
        </div>
      </form>
      <p className='text-sm'>
        * Your avatar is sourced from <SafeExternalLink to='https://gravatar.com' tabIndex='-1'>gravatar.com</SafeExternalLink>
        using this email
      </p>
    </div>
  )
}

export default Create
