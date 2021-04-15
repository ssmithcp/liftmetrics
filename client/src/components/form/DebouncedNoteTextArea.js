import DebouncedInput from './DebouncedInput'
import NoteTextArea from './NoteTextArea'

const DebouncedNoteTextArea = ({ ...rest }) => (
  <DebouncedInput
    Input={ NoteTextArea }
    delay={ 3000 }
    { ...rest }
  />
)

export default DebouncedNoteTextArea
