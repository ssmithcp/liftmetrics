const PageTitle = ({ title, className }) => (
  <h1 className={  `text-2xl mb-4 ${ className || '' }` }>{ title }</h1>
)

export default PageTitle