const program = require('commander');
 
program
  .version('0.0.1')
  .option('-a, --add', '求和')
  .option('-f, --factorial <num>', '阶乘')
  .parse(process.argv);

const factorial = (num) => {
  if (num < 0) {
    return -1
  } else if (num === 0 || num === 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}

if (program.add) {
  let sum = 0
  program.args.forEach(item => {
    sum += item * 1
  })
  console.log(sum)
} else if (program.factorial) {
  let result = factorial(program.factorial)
  console.log(result)
}





