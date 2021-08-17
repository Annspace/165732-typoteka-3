'use strict';

const fs = require(`fs`).promises;

const {Router} = require(`express`);

const {FILE_NAME} = require(`../../constants`);

const postsRouter = new Router();

postsRouter.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    if (mocks.length) {
      res.json(mocks);
    } else {
      res.send([]);
    }

  } catch (e) {
    res.send([]);
  }
});

module.exports = postsRouter;
