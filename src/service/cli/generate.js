'use strict';

const fs = require(`fs`);

const {MAX_OFFERS, ExitCode, TITLES, CATEGORIES, SENTENCES, FILE_NAME, DEFAULT_COUNT} = require(`../../constants`);

const {getRandomInt, shuffle, getRandomDate} = require(`../../utils`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getRandomDate(3),
    announce: shuffle(SENTENCES).slice(1, getRandomInt(2, 5)).join(` `),
    fullText: shuffle(SENTENCES).slice(1, getRandomInt(2, SENTENCES.length - 1)).join(` `),
    category: shuffle(CATEGORIES).slice(1, getRandomInt(2, CATEGORIES.length - 1)),
  }))
);

const writeToFile = (data, fileName = FILE_NAME) => {

  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(`Can't write data to file...`);
      process.exit(ExitCode.ERROR);
    }

    console.info(`Operation success. File created.`);
    process.exit(ExitCode.SUCCESS);
  });
};

const run = (count) => {
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (countOffer > MAX_OFFERS) {
    console.info(`Не больше 1000 публикаций`);
    process.exit(ExitCode.ERROR);
  }

  const content = JSON.stringify(generateOffers(countOffer));

  writeToFile(content);

};

module.exports = {
  name: `--generate`,
  run,
};
