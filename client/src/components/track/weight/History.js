import { useContext } from 'react'

import WeightContext from './context'

import { format } from 'date-fns'

const History = () => {
  const { weights } = useContext(WeightContext)

// delta since last weigh in
// delete entry
// change date or value
// show time

  const reversed = [ ...weights ].reverse()

  return (
    <>
      <h2 className='text-xl'>Last 6 weeks of weigh-ins</h2>
      <table>
        <tbody>
          {
            reversed.map(w => (
              <tr key={ w.date }>
                <td>{ `${ w.value } ${ w.unit }s`}</td>
                <td>{ format(w.date, 'PP') }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default History