const program = require('commander');
program
  .version('1.0.0')
  .command('my-add <num>')
  .option('-a, --add, <num>', '加法')
	.action((num, cmd) => {
    console.log(num, cmd.add)
  })

program
  .option('-u, --upadte', '更新')  
  .description('描述信息！！！')
  
program.parse(process.argv)
