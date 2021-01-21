import React from 'react'

import Input from '../util/Input'
import SafeExternalLink from '../util/SafeExternalLink'
import InternalLink from '../util/InternalLink'

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
    <div className='mx-auto md:w-750px'>
      <h1 className='text-2xl mb-4'>Sign Up</h1>
      <form
        className='flex flex-col'
        onSubmit={ onSubmit }
      >
        <Input type='text' placeholder='First Name' name='firstName' required />
        <Input type='text' placeholder='Last Name' name='Last Name' required />
        <Input type='email' placeholder='Email Address' name='email' required />
        <p className='text-sm'>
          Your avatar is sourced from <SafeExternalLink to='https://gravatar.com' tabIndex='-1'>gravatar.com</SafeExternalLink> using this email
        </p>
        <button
          className='text-right text-primary focus:outline-none'
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
        />
        <div className='text-center'>
          <input
            type='submit'
            className='my-3 py-4 w-full text-xl border-2 border-black bg-white md:w-2/4'
            value='Create account'
          />
        </div>
      </form>
      <p className='my-4 text-center'>
        Already have an account? <InternalLink to='/account/login'>Login</InternalLink>
      </p>
    </div>
  )
}

export default Create
