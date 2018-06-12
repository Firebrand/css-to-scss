const fs = require('fs');
const Promise = require('bluebird');
// const Calc = require('./modules/calculator');

Promise.promisifyAll(fs);


const fileContentsToArray = (fileContent) => {
  console.log(fileContent.split(/\r|\n/));
};


const openFile = (fileName) => {
  return fs.readFileAsync(fileName, 'utf8')
    .then((fileContents) => {
      const fileContentArray = fileContentsToArray(fileContents);
      return fileContentArray;
    })
    .catch(console.error('Unable to read the file'));
};


module.exports = {
  openFile,
};
