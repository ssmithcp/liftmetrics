import { connect } from 'react-redux'

import { IconContext } from 'react-icons'
import { VscError, VscWarning, VscInfo, VscClose } from 'react-icons/vsc'


import { removeAlert, ERROR, WARNING, INFO } from '../../actions/alert'
import Container from './Container'

const iconStyle = 'p-3 w-14 h-14'

const AlertIcon = ({ type }) => {
  switch(type) {
    case ERROR:
      return (
        <IconContext.Provider value={{ className: `${iconStyle} text-red-500` }}>
          <VscError />
        </IconContext.Provider>
      )
    case WARNING:
      return (
        <IconContext.Provider value={{ className: `${iconStyle} text-yellow-500` }}>
          <VscWarning />
        </IconContext.Provider>
      )
    case INFO:
    default:
      return (
        <IconContext.Provider value={{ className: `${iconStyle} text-blue-500` }}>
          <VscInfo />
        </IconContext.Provider>
      )
  }
}

const Alert = ({ alert, clearAlert }) => (
  <div
    className='mt-4 mx-auto flex items-center justify-between text-lg border border-black bg-white w-3/4 md:w-3/5 lg:w-2/4'
  >
    <div className='flex items-center'>
      <AlertIcon type={ alert.type } />
      <p>{ alert.message }</p>
    </div>
    { clearAlert && (
      <VscClose
        className={ `${iconStyle} border-black border-l cursor-pointer` }
        onClick={ clearAlert }
      />
    )}
  </div>
)

const Alerts = ({ alerts, removeAlert }) => {
  const lastAlert = alerts.length > 2 ? alerts[2] : null
  const displayedAlerts = lastAlert ? alerts.slice(0, 2) : alerts

  return (
    <Container>
      <div className='select-none text-center'>
        { displayedAlerts.map(a =>
          <Alert
            key={ a.id }
            alert={ a }
            clearAlert={ () => removeAlert(a.id) }
          />
        )}
        { lastAlert && (
          <Alert
            key='hiding-others'
            alert={ {
              ...lastAlert,
              message: `${alerts.length - 2} more ...`
             } }
        />
        )}
      </div>
    </Container>
  )
}

const mapStateToProps = state => ({
  alerts: state.alert.sort((a, b) =>  a.date - b.date )
})

export default connect(mapStateToProps, { removeAlert })(Alerts)