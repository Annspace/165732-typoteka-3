'use strict';

const fs = require(`fs`).promises;

const {Router} = require(`express`);

const {FILE_NAME} = require(`../../constants`);

const postsRouter = new Router();

postsRouter.get(`/posts`, async (req, res) => {
  const fileContent = await fs.readFile(FILE_NAME);
  const mocks = JSON.parse(fileContent);
  res.json(mocks);
});

module.exports = postsRouter;
