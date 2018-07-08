const path = require('path');


const parsedPath = path.parse('this/test/test.css');
const newFile = path.format({
  root: parsedPath.root,
  dir: parsedPath.dir,
  ext: '.scss',
  name: `${parsedPath.name}_clean`,
});

console.log(path.normalize(newFile));
