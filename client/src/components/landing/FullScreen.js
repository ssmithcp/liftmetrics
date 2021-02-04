import InternalLink from '../navigation/InternalLink'
import routes from '../navigation'

const FullScreen = ({ children }) => (
  <>
    <main className='h-screen flex flex-col justify-center items-center'>
      { children }
    </main>
    <footer className='fixed right-0 bottom-0 left-0 z-10 text-center'>
      <p className='m-2 text-gray-700'>
        &#169; { new Date().getFullYear() } <InternalLink to={ routes.about.path }>Scott Smith</InternalLink>
      </p>
    </footer>
  </>
)

export default FullScreen
