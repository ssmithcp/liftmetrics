const Template = ({ title, children }) => (
  <div className='mx-auto text-center md:w-750px'>
    <h1 className='text-2xl mb-4'>{ title }</h1>
    { children }
  </div>
)

export default Template