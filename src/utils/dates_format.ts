import { DateTime, Interval } from 'luxon'

export function dateToISOString(date: any) {
  return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}

export function dateToISOStringAddOneDay(date: any) {
  return new Date(Date.parse(date) + 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
}

//Se utiliza en el excel para reportes
export function formatOnlyDateTZ(dateISO: string, timezone: string) {
  return DateTime.fromISO(dateISO, { zone: timezone }).toFormat('dd LLL yyyy')
}

//Se utiliza en el excel para reportes
export function formatTimeTZ(dateISO: string, timezone: string) {
  return DateTime.fromISO(dateISO, { zone: timezone }).toFormat('HH:mm')
}

export function monthDiff(endDateISO: number) {
  const date1 = DateTime.now().toJSDate();
  const date2 = DateTime.fromSeconds(endDateISO).toJSDate();
  const diff = Interval.fromDateTimes(date1, date2);
  const diffHours = diff.length('months');

  return Math.floor(diffHours)
}

export function unixToDate (value: number) {
  return DateTime.fromSeconds(value).setLocale('es-MX').toLocaleString(DateTime.DATE_FULL)
}
