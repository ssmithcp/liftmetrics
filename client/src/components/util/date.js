import { format } from 'date-fns'

export const day = date => format(date, 'eee LLL do ')

export const dayTime = date => format(date, 'eee LLL do @ p')