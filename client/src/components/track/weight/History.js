import { format } from 'date-fns'

const History = ({ samples }) => (
  <>
  <h2 className='text-xl'>Last 6 weeks of weigh-ins</h2>
  <table>
    <tbody>
      {
        samples.map(d => (
          <tr key={ d.date }>
            <td>{ `${ d.weight } ${ d.unit }s`}</td>
            <td>{ format(d.date, 'PP') }</td>
          </tr>
        ))
      }
    </tbody>
  </table>
  </>
)

export default History