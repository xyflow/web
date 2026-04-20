// adapted from https://www.npmjs.com/package/native-time-ago

import { now } from '../../lib/now';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;
const UNITS = [
  { unit: 'year', duration: YEAR },
  { unit: 'month', duration: MONTH },
  { unit: 'week', duration: WEEK },
  { unit: 'day', duration: DAY },
  { unit: 'hour', duration: HOUR },
  { unit: 'minute', duration: MINUTE },
  { unit: 'second', duration: SECOND },
] as const;

function timeAgo(date: string, locale = 'en') {
  const timestamp = Date.parse(date);

  if (!Number.isFinite(timestamp)) {
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(0, 'second');
  }
  const diff = now() - timestamp;
  const absDiff = Math.abs(diff);
  for (const { unit, duration } of UNITS) {
    const value = Math.round(absDiff / duration);
    if (value >= 1) {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      return rtf.format(diff < 0 ? value : -value, unit);
    }
  }
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  return rtf.format(0, 'second');
}

export function TimeAgo({ date }: { date: string }) {
  return <span>{timeAgo(date)}</span>;
}
