const ResponsiveSelect = ({ name, value, setValue, values }) => (
  <select
    id={ name }
    name={ name }
    value={ value }
    onChange={ e => setValue(e.target.value) }
    className='text-xl max-w-full md:max-w-sm'
  >
    { values.map(m =>
      <option key={ m.id } value={ m.id }>
        { m.name.length <= 34
          ? m.name
          : m.name.substring(0, 31) + '...'
        }
      </option>
    )}
  </select>
)

export default ResponsiveSelect