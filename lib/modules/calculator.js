
class Calculator {
  constructor() {
    this.total = 0;
  }

  add(...args) {
    args.forEach((arg) => {
      this.total += arg;
    });
    return this;
  }

  subtract(...args) {
    args.forEach((arg) => {
      this.total -= arg;
    });
    return this;
  }

  multiply(...args) {
    args.forEach((arg) => {
      this.total *= arg;
    });
    return this;
  }


  divide(...args) {
    args.forEach((arg) => {
      this.total /= arg;
    });
    return this;
  }
}


module.exports = Calculator;
