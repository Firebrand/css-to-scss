const fs = require('fs');
const Promise = require('bluebird');
const Calc = require('./modules/calculator');

Promise.promisifyAll(fs);


const fileContentsToArray = fileContent => fileContent.split(/\r|\n/);


const _openFile = fileName => fs.readFileAsync(fileName, 'utf8')
  .then((fileContents) => {
    const fileContentArray = fileContentsToArray(fileContents);
    return fileContentArray;
  })
  .catch(() => console.log('Unable to read the file'));


const main = fileName => _openFile(fileName).then((fileContentArray) => {
  if (fileContentArray.length > 0) {
    const calculator = new Calc();
    const { total } = calculator.calculateMultipleValues(fileContentArray);
    console.log(total);
    return total;
  }
  throw new Error('File had insufficient data');
})
  .catch(() => console.log('File had insufficient data'));


module.exports = {
  _openFile,
  main,
};
