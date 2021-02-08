import { dayTime } from '../../util/date'

const History = ({ reversed }) => {

// delta since last weigh in
// delete entry
// change date or value

  return (
    <div>
      <h2 className='text-xl mb-4'>Last 6 weeks of weigh-ins</h2>
      <table>
        <tbody>
          {
            reversed.map(w => (
              <tr key={ w.date }>
                <td>{ `${ w.value } ${ w.unit }s`}</td>
                <td>{ dayTime(w.date) }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default History