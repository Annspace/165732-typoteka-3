'use strict';

const chalk = require(`chalk`);
const express = require(`express`);

const {DEFAULT_PORT} = require(`../../constants`);
const postsRouter = require(`../../express/routes/posts`);

const run = (customPort) => {
  const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

  const app = express();

  app.listen(DEFAULT_PORT, () => {
    console.info(chalk.green(`Сервер запущен на порту: ${port}`));
  });

  app.use(express.json());

  app.use(`/`, postsRouter);

};

module.exports = {
  name: `--server`,
  run,
};
