import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import duration from 'dayjs/plugin/duration'
import isoWeek from 'dayjs/plugin/isoWeek'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(isoWeek)
dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)
dayjs.extend(localizedFormat)

export { dayjs }

const asyncLocaleMap = {
  en: () => import('dayjs/locale/en'),
  vi: () => import('dayjs/locale/vi'),
}

export async function setDayjsLocale(locale: keyof typeof asyncLocaleMap) {
  if (!(locale in asyncLocaleMap))
    throw new Error(`locale ${locale} not defined`)

  return asyncLocaleMap[locale]().then(() => dayjs.locale(locale))
}

export interface dateSuffixParams {
  start?: number
  end?: number
  download?: boolean
  format?: string
  delimiter?: string
}
/**
 * Utility function to generate a date suffix string for things like reports
 */
export function dateSuffix({ start, end, download, format = 'YYYY-MM-DD', delimiter = '_' }: dateSuffixParams = {}) {
  let str = ''

  if (start)
    str += `${delimiter}s=${dayjs(start).format(format)}`

  if (typeof end !== 'undefined')
    str += `${delimiter}e=${dayjs(end).format(format)}`

  if (download)
    str += `${delimiter}d=${dayjs().format(format)}`

  return str
}
