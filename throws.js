const _ = require('lodash');


const object1 = { classA: { classB: { 'font-weight': 'bold', color: 'red' } } };

const object2 = { classA: { stuff: 'cool', classB: { shit: 'cool', color: 'pink' } } };


console.log(_.merge(object1, object2) );
