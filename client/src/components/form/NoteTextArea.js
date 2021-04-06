const NoteTextArea = ({ value, setValue, className = '' }) => (
  <textarea
    name='note'
    value={ value }
    onChange={ e => setValue(e.target.value) }
    rows='2'
    cols='35'
    placeholder='Notes'
    autoCorrect='off'
    className={ `border border-gray-400 p-2 focus:outline-none focus:border-black ${ className }` }
  />
)

export default NoteTextArea
