#!/usr/bin/env node

const args = require('args');
const chalk = require('chalk');
const calculatoor = require('../lib/');
const fs = require('fs');


args
  .option('open', 'Open a file for processing');

const flags = args.parse(process.argv, { name: 'calculatoor' });


if (fs.existsSync(flags.open)) {
  calculatoor.openFile(flags.open);
} else {
  console.log(chalk.red('There was an error trying to read that file name'));
}

