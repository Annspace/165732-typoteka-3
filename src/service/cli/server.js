'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const {
  DEFAULT_PORT,
  FILE_NAME,
  HttpCode,
} = require(`../../constants`);

const sendResponse = (res, statusCode, message) => {
  const template = `
      <!Doctype html>
        <html lang="ru">
        <head>
          <title>With love from Node</title>
        </head>
        <body>${message}</body>
      </html>`.trim();

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        console.log(err);
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }

      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
};

const run = (customPort) => {
  const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
  http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, () => {
      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    })
    .on(`error`, ({message}) => {
      throw new Error(`Ошибка при создании сервера: ${message}`);
    });
};


module.exports = {
  name: `--server`,
  run,
};
