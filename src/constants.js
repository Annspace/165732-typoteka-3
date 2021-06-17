'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const MAX_OFFERS = 1000;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  DEFAULT_COUNT,
  ExitCode,
  MAX_OFFERS,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
};
