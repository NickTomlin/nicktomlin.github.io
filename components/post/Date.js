import {DateTime} from 'luxon'

export function Date ({ dateString }) {
  // backwards compat with posts
  const sanitized = (dateString || '').replace(/\s/, 'T')
  const formatted = DateTime.fromISO(sanitized).toLocaleString(DateTime.DATE_FULL)
  return <time dateTime={dateString}>{formatted}</time>
}
