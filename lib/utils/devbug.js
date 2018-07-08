const chalk = require('chalk');


const colors = {
  RED: 'red', GREEN: 'green', YELLOW: 'yellow', BLUE: 'blue', GRAY: 'gray', PURPLE: 'magenta', CYAN: 'cyan', WHITE: 'white',
};


const dbg = (description, valueToOutput, color = colors.WHITE) => {
  if (typeof valueToOutput !== 'undefined') {
    const char = '-';
    const desc = `---------- ${description} (${valueToOutput.length}) ----------`;
    console.log(chalk.keyword(color)(desc));

    let output = valueToOutput;

    if (typeof valueToOutput === 'object') {
      output = JSON.stringify(valueToOutput);
    }

    console.log(chalk.keyword(color)(output));

    console.log(chalk.keyword(color)(char.repeat(desc.length)));
    console.log('\n');
  }
};


module.exports = { dbg, colors };
