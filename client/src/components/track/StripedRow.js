const StripedRow = ({ index, className, children }) => {
  const rowStyle = index % 2 === 1
    ? 'bg-gray-200 hover:bg-gray-400 hover:opacity-90'
    : 'hover:bg-gray-400 hover:opacity-90'

  return (
    <div className={ `${ rowStyle } ${ className }` }>
      { children }
    </div>
  )
}

export default StripedRow