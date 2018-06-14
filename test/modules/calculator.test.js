const { assert } = require('chai');
const Calculator = require('../../lib/modules/calculator');

const testCalc = new Calculator(10);

// Cool
describe('Calculator', () => {
  it('Addition', () => {
    const result = testCalc.calculateValue('+5').total;
    assert.equal(result, 15);
  });

  it('Subtraction', () => {
    const result = testCalc.calculateValue('-2').total;
    assert.equal(result, 13);
  });

  it('Multiplication', () => {
    const result = testCalc.calculateValue('*4').total;
    assert.equal(result, 52);
  });

  it('Division', () => {
    const result = testCalc.calculateValue('/2').total;
    assert.equal(result, 26);
  });

  it('Array of values', () => {
    const result = testCalc.calculateMultipleValues(['-6', '+30', '*4', '/2']).total;
    assert.equal(result, 100);
  });
});

