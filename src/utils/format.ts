export function dateTimeFormat(dateTimeString: string) {
  const dateTime = new Date(dateTimeString)

  if (dateTime.toString() === 'Invalid Date') {
    return '-'
  }

  return dateTime.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
    hour12: false,
  })
}
