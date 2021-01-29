const TitledPage = ({ title, className, children }) => (
  <>
    <h1 className='text-2xl mb-2'>{ title }</h1>
    <div className={ className }>
      { children }
    </div>
  </>
)

export default TitledPage