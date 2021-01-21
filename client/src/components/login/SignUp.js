import React from 'react'

import Input from '../util/Input'



const SignUp = () => {
  const onSubmit = () => {

  }

  return (
    <>
      <h1 className='text-2xl mb-4'>Sign Up</h1>
      <form
        className='flex flex-col'
        onSubmit={ onSubmit }
      >
        <Input type='text' placeholder='Name' name='name' required />
        <div>
        <Input type='email' placeholder='Email Address' name='email' />
        <small className='form-text'
          >This site uses Gravatar so if you want a profile image, use a
          Gravatar email</small>
        </div>
        <Input
          type='password'
          placeholder='Password'
          name='password'
          minLength='6'
        />
        <Input
          type='password'
          placeholder='Confirm Password'
          name='password2'
          minLength='6'
        />
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <a href='/login'>Login</a>
      </p>
    </>
  )
}

export default SignUp
