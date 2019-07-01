const moment =require('moment')
// console.log(moment().format())
// console.log(moment())
// console.log(moment().year())
const year=moment().year()
const month=moment().month()
const day=moment().daysInMonth()
const d=moment().date();
console.log(`${year}-${month}-${day}-${d}`)
console.log(moment().millisecond())
console.log(moment.unix())
var date=new Date
console.log(date.getDate()) 
console.log(Math.floor(1000 * Math.random()))