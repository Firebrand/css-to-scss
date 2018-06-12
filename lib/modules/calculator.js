class Calculator {
  constructor(startingTotal = 0) {
    this.total = startingTotal;
  }


  calculateMultipleValues(valuesArr) {
    valuesArr.forEach((value) => {
      this.calculateValue(value);
    });
    return this;
  }


  calculateValue(value) {
    const operator = value[0];
    const val = Number(value.substr(1, value.length));
    switch (operator) {
      case '+':
        this._add(val);
        break;
      case '-':
        this._subtract(val);
        break;
      case '*':
        this._multiply(val);
        break;
      case '/':
        this._divide(val);
        break;
      default:
        break;
    }
    return this;
  }


  _add(value) {
    this.total += value;
    return this;
  }

  _subtract(value) {
    this.total -= value;
    return this;
  }

  _multiply(value) {
    this.total *= value;
    return this;
  }


  _divide(value) {
    this.total /= value;
    return this;
  }
}


module.exports = Calculator;
