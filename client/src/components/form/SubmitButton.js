const SubmitButton = ({ className, ...rest }) => (
  <input
    type='submit'
    className={ `my-3 text-xl bg-white cursor-pointer focus:outline-none
      border border-gray-400
      hover:border-black focus:border-black
      ${ className || '' }`
    }
    { ... rest }
  />
)

export default SubmitButton