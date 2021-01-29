const PageWidthContainer = ({ children, className }) => (
  <div className={ `container mx-auto px-2 md:px-4 ${className || ''}` }>
    { children }
  </div>
)

export default PageWidthContainer