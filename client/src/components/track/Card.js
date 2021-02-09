const Card = ({ children, className = ''}) => (
  <div className={ `flex flex-col justify-center items-center ${ className }` }>
    <div>
      { children }
    </div>
  </div>
)

export default Card