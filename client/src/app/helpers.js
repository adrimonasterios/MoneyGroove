import moment from 'moment-timezone';

export function formatDate(date) {
  let formattedDate = moment.tz(`${date}`, "America/Toronto").format().split('T')[0]
  return formattedDate
}
