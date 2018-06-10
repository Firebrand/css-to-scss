const Calc = require('./modules/calculator');

const calculator1 = new Calc();
calculator1
  .add(21, 10)
  .add(10)
  .subtract(5)
  .add(1, 1, 1, 1)
  .divide(5);

const calculator2 = new Calc();
calculator2.add(1000, 5000).divide(2);


console.log(calculator1.total);
console.log(calculator2.total);
