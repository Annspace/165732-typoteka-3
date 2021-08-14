'use strict';

const express = require(`express`);
const {DEFAULT_PORT_EXPRESS} = require(`../constants`);
const articlesRouter = require(`./routes/articles`);
const myRouter = require(`./routes/my`);

const app = express();

app.listen(DEFAULT_PORT_EXPRESS, () => {
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT_EXPRESS}`);
});

app.use(express.static(`${__dirname}/public`));

app.set(`views`, `${__dirname}/templates`);
app.set(`view engine`, `pug`);

app.get(`/`, (req, res) => {
  res.render(`main`);
});

app.get(`/login`, (req, res) => {
  res.render(`login`);
});

app.get(`/register`, (req, res) => {
  res.render(`sign-up`);
});

app.get(`/search`, (req, res) => {
  res.render(`search-1`);
});

app.use(`/articles`, articlesRouter);

app.use(`/my`, myRouter);

app.get(`/categories`, (req, res) => res.render(`all-categories`));

app.use((req, res) => {
  res.status(404).render(`400`);
});

app.use((req, res) => {
  res.status(500).render(`500`);
});
