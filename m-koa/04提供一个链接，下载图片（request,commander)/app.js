const fs = require('fs')
const request = require('request')
const program = require('commander')


program
  .option('-d, --down <url>', '下载')
  .parse(process.argv);


let url = program.down

const name = url.slice(url.lastIndexOf('/') + 1)
request(url).pipe(fs.createWriteStream('./' + name));

//node app -d https://n3-q.mafengwo.net/s15/M00/16/18/CoUBGV2xnO6ALntcAB_DZLkVUnY568.png


