import React from 'react'
import { connect } from 'react-redux'

import { IconContext } from 'react-icons'
import { VscError, VscWarning, VscInfo, VscClose, VscEllipsis } from 'react-icons/vsc'


import { ERROR, WARNING, INFO } from '../../actions/alert'
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
  <div className='mx-auto flex items-center justify-between text-lg border border-black bg-white w-2/4 md:w-2/5'>
    <div className='flex items-center'>
      <AlertIcon type={ alert.type } />
      <p>{ alert.message }</p>
    </div>
      <VscClose
        className={ `${iconStyle} border-black border-l cursor-pointer` }
        onClick={ clearAlert }
      />
  </div>
)

const Alerts = ({ alerts }) => (
  <Container>
    <div className='pt-2 select-none text-center'>
      { alerts.map(a =>
        <Alert alert={ a } />
      )}
    </div>
  </Container>
)

const mapStateToProps = state => ({
  alerts: state.alert,
})

export default connect(mapStateToProps)(Alerts)