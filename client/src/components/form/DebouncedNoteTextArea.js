import DebouncedInput from './DebouncedInput'
import NoteTextArea from './NoteTextArea'

const DebouncedNoteTextArea = ({ ...rest }) => (
  <DebouncedInput
    Input={ NoteTextArea }
    { ...rest }
  />
)

export default DebouncedNoteTextArea
