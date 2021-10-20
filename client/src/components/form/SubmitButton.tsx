import { style } from 'components/util/BigButton';
import React from 'react';

type SubmitButtonProps = React.InputHTMLAttributes<HTMLInputElement>;

const SubmitButton = ({ className = '', ...rest }: SubmitButtonProps) => (
  <div className='text-center my-6'>
    <input
      type='submit'
      className={ style + className }
      { ... rest }
    />
  </div>
);

export default SubmitButton;