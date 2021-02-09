const ConfirmationDialog = () => {
  const isVisible = false

  return (
    <div
      className={ isVisible ? 'block' : 'hidden' }
    >
      <div className='z-40 fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-black opacity-50'></div>
      <div
        className={ `z-50 fixed opacity-100 top-1/2 left-1/2 w-1/2 h-1/2 bg-white border
                     transform -translate-y-1/2 -translate-x-1/2
                     flex items-center justify-center` }>
        <h1>test</h1>

      </div>
    </div>
  )
}

export default ConfirmationDialog