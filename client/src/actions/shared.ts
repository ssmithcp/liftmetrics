import { addWeeks, addDays } from 'date-fns';

import { Instant } from '../types';

export const defaultRange = (): Instant => addDays(addWeeks(Date.now(), -12), -1);