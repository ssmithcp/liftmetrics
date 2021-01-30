import PageTitle from '../util/PageTitle'

const TitledPage = ({ title, className, children }) => (
  <>
    <PageTitle title={ title } />
    <div className={ className }>
      { children }
    </div>
  </>
)

export default TitledPage