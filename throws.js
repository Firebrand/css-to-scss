const {
  dbg,
  colors,
} = require('./lib/utils/devbug');
const _ = require('lodash');

const testArr = ['margin:0 auto;max-width:70em; padding:23px', 'body:2', 'margin:0 auto;max-width:70em;'];


const constArrToObj = (arr) => {
  let i = 0;
  const myobj = {};
  arr.forEach((value) => {
    if (value.length > 1) {
      myobj[i] = _.trim(value, ';').split(';');
      i += 1;
    }
  });
  return myobj;
};


const processObj = (testObj) => {
  const keys = Object.keys(testObj);
  const results = [];
  const temp = [...keys];

  keys.forEach((key) => {
    temp.shift();
    temp.forEach((secondKey) => {
      dbg('Comparing', testObj[key], colors.RED);
      dbg('Comparing with', testObj[secondKey], colors.GREEN);
      let intersected = _.intersection(testObj[key], testObj[secondKey]);
      dbg('Intersected', intersected, colors.PURPLE);
    });
  });

  return results;
};


console.log(processObj(constArrToObj(testArr)));
