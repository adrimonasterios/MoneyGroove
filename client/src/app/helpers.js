import moment from 'moment-timezone';

export function formatDate(date) {
  let formattedDate = moment.tz(`${date}`, "America/Toronto").format().split('T')[0]
  return formattedDate
}

export function formatAmount(amount) {
  if(typeof amount !== 'string'){
    console.log('amount is not string');
  }else if(!amount.includes('.')){
    amount += ".00"
  }else if(amount.split('.').length > 2){
    console.log('amount has more than one dot');
  }else if(amount.split('.')[1].length < 2){
    amount += "0"
  }
  return amount
}
