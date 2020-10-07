import express from 'express';

const middlewares = [
  express.urlencoded({ extended: false }),
  express.json(),
];

export const setAppMiddlewares = (app) => middlewares.forEach((item) => app.use(item));
