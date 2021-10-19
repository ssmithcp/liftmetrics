import { addWeeks, addDays } from 'date-fns';

export const defaultRange = (): Date => addDays(addWeeks(Date.now(), -12), -1);