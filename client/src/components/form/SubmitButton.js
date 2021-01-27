const SubmitButton = ({ className, ...rest }) => (
  <input
    type='submit'
    className={ `my-3 text-xl bg-white cursor-pointer focus:outline-none border focus:border-2 border-black ${ className || '' }` }
    { ... rest }
  />
)

export default SubmitButton