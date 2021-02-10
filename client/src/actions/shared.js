import { addWeeks, addDays } from 'date-fns'

export const defaultRange = () => addDays(addWeeks(Date.now(), -4), -1)