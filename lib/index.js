const fs = require('fs');
const {
  dbg,
  colors
} = require('./utils/devbug');
const parser = require('./components/sassParser');


const main = (fileName) => {
  const fileContents = fs.readFileSync(fileName, 'UTF8');

  const coolSCSS = parser(fileContents);

  fs.writeFile('test/testout.scss', coolSCSS, (err) => {
    if (err) throw err;

    console.log('Success!');
  });
};


module.exports = {
  main,
};