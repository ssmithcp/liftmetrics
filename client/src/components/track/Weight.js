import { format, parse } from 'date-fns'

import TitledPage from '../container/TitledPage'

// convert to common units
// common date display component
// get weights up to 6 weeks in the past
// show weight trend: * maintaining weight * trending +.5lb per week
// show delta per weigh in
// show number of days since weigh in
// show trend between those samples
// up down buttons
// saved notification fade-in-out

const Weight = () => {
  const samples = [
    { weight: 180, unit: 'lb', date: parse('1/1/2021', 'MM/dd/yyyy', new Date()) },
    { weight: 179, unit: 'lb', date: parse('12/1/2020', 'MM/dd/yyyy', new Date()) },
    { weight: 178, unit: 'lb', date: parse('11/1/2020', 'MM/dd/yyyy', new Date()) },
  ]

  return (
    <TitledPage title='Track body weight'>
      <form>
        <div className='flex flex-col'>
          <label for='weight'>Current weight</label>
          <input
            type='number'
            placeholder='180'
            name='weight'
          />
        </div>
        <button>Save</button>
        <table>
          <tbody>
            {
              samples.map(d => (
                <tr key={ d.date }>
                  <td>{ d.weight }{ d.unit }{ d.weight > 1.0 ? 's' : ''}</td>
                  <td>{ format(d.date, 'PPpp') }</td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </form>
    </TitledPage>
  )
}

export default Weight