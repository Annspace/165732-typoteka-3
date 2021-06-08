'use strict';

const packageJsonFile = require(`../../../package.json`);
const chalk = require(`chalk`);

const run = () => console.info(chalk.blue(packageJsonFile.version));

module.exports = {
  name: `--version`,
  run,
};
