import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

export function dayjsPR(date) {
  return dayjs(date).tz("America/Puerto_Rico")
}
