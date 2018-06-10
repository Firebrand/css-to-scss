const { assert } = require('chai');
const Calculator = require('../lib/modules/calculator');

const testCalc = new Calculator();

describe('App', () => {
  it('Addition should work', () => {
    const result = testCalc.add(5, 3).total;
    assert.equal(result, 8);
  });

  it('Subtraction should work', () => {
    const result = testCalc.subtract(3).total;
    assert.equal(result, 5);
  });

  it('Multiplication should work', () => {
    const result = testCalc.multiply(3).total;
    assert.equal(result, 15);
  });

  it('Division should work', () => {
    const result = testCalc.divide(2).total;
    assert.equal(result, 7.5);
  });

  it('Chaining should work', () => {
    const result = testCalc.add(2.5).subtract(8).add(2).multiply(4)
      .divide(2).total;
    assert.equal(result, 8);
  });
});

