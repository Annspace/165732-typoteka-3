'use strict';

const express = require(`express`);
const {DEFAULT_PORT_EXPRESS} = require(`../constants`);
const articlesRouter = require(`./routes/articles`);
const myRouter = require(`./routes/my`);

const app = express();
app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.get(`/`, (req, res) => res.send(`/`));
app.get(`/register`, (req, res) => res.send(`/register`));
app.get(`/login`, (req, res) => res.send(`/login`));
app.get(`/search`, (req, res) => res.send(`/search`));
app.get(`/categories`, (req, res) => res.send(`/categories`));
app.listen(DEFAULT_PORT_EXPRESS, () => {
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT_EXPRESS}`);
});
