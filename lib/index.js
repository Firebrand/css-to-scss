const fs = require('fs');
const { dbg, colors } = require('./utils/devbug');
const parser = require('./components/sassParser');
const sass = require('node-sass');


const main = (fileName) => {
  const fileContents = fs.readFileSync(fileName, 'UTF8');
  const result = sass.renderSync({
    data: fileContents,
  }).css.toString();

  dbg('CSS', result, colors.YELLOW);

  parser(result);
};


module.exports = {
  main,
};
