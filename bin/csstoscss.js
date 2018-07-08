#!/usr/bin/env node

const args = require('args');
const chalk = require('chalk');
const sassTidy = require('../lib/');
const fs = require('fs');


args.option('open', 'Open a file for processing');

const flags = args.parse(process.argv, { name: 'sass-tidy' });


if (fs.existsSync(flags.open)) {
  sassTidy.main(flags.open);
} else {
  console.log(chalk.red(`Could not open "${flags.open}"`));
}

