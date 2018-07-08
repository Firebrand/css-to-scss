const fs = require('fs');
const path = require('path');
const {
  dbg,
  colors,
} = require('./utils/devbug');
const { convertCssToObject, convertCssToScss } = require('./components/sassParser');


const _readFileContents = filename => fs.readFileSync(filename, 'UTF8');

const _writeFileContents = (filename, contents) => {
  fs.writeFileSync(filename, contents);
};


const cssToObject = cssContent => convertCssToObject(cssContent);


const cssToScss = cssContent => convertCssToScss(cssContent);


const processCSSFile = (filename) => {
  const initialContents = _readFileContents(filename);
  const processedContents = cssToScss(initialContents);



  const parsedPath = path.parse(filename);
  const newFile = path.format({
    root: parsedPath.root,
    dir: parsedPath.dir,
    ext: '.scss',
    name: `${parsedPath.name}_clean`,
  });


  _writeFileContents(path.normalize(newFile), processedContents);
};


module.exports = {
  _readFileContents,
  _writeFileContents,
  cssToObject,
  cssToScss,
  processCSSFile,
};
