import PageTitle from './PageTitle'

const MediumWidth = ({ title, children, className }) => (
  <div className={ `mx-auto md:w-750px ${ className || '' }` }>
    <PageTitle title={ title } />
    { children }
  </div>
)

export default MediumWidth