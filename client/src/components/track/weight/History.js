import { format } from 'date-fns'

const History = ({ samples }) => (
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
)

export default History