'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {MAX_OFFERS, ExitCode, FILE_NAME, FILE_SENTENCES_PATH, FILE_TITLES_PATH, FILE_CATEGORIES_PATH, DEFAULT_COUNT}
= require(`../../constants`);

const {getRandomInt, shuffle, getRandomDate} = require(`../../utils`);

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(3),
    announce: shuffle(sentences).slice(1, getRandomInt(2, 5)).join(` `),
    fullText: shuffle(sentences).slice(1, getRandomInt(2, sentences.length - 1)).join(` `),
    category: shuffle(categories).slice(1, getRandomInt(2, categories.length - 1)),
  }))
);

const writeToFile = async (data, fileName = FILE_NAME) => {
  try {
    await fs.writeFile(fileName, data);
    console.info(chalk.green(`Operation success. File created.`));
  } catch (e) {
    throw new Error(chalk.red(`Can't write data to file...`));
  }
};

const readFromFile = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    throw new Error(chalk.red(err));
  }
};

const run = async (count) => {
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (countOffer > MAX_OFFERS) {
    console.info(chalk.red(`Не больше 1000 публикаций`));
    process.exit(ExitCode.ERROR);
  }

  const [sentences, titles, categories] = await Promise.all([
    readFromFile(FILE_SENTENCES_PATH),
    readFromFile(FILE_TITLES_PATH),
    readFromFile(FILE_CATEGORIES_PATH)
  ]);

  const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

  console.log(titles);

  await writeToFile(content);

};

module.exports = {
  name: `--generate`,
  run,
};
