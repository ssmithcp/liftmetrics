import { useState } from 'react'

const TabbedPanel = ({ active, tabs }) => {
  const [visibleTab, setVisibleTab] = useState(active)

  const activeStyle = 'border-soft-black border-t border-l border-r'
  const inactiveStyle = 'border-soft-black border-b'

  const VisibleComponent = tabs.find(t => t.name === visibleTab).component

  return (
    <div className='w-full md:m-2'>
      <ol className='flex w-full'>
        { tabs.map(t =>
          <li
            key={ t.name }
            className={ `px-3 py-2 whitespace-nowrap ${ visibleTab === t.name ? activeStyle : inactiveStyle }` }
            onClick={ e => setVisibleTab(t.name) }
          >
            { t.name }
          </li>
        )}
        <li
          key='spacer'
          className={ `w-full ${ inactiveStyle }` }
        >
        </li>
      </ol>
      <div className='px-2 py-1'>
        <VisibleComponent />
      </div>
    </div>
  )
}

export default TabbedPanel