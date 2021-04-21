'use strict';

const packageJsonFile = require(`../../../package.json`);

const run = () => console.info(packageJsonFile.version);

module.exports = {
  name: `--version`,
  run,
};
