import express from 'express';
import session from 'express-session';

const middlewares = [
  express.urlencoded({ extended: false }),
  express.json(),
  session({
    resave: true,
    saveUninitialized: false,
    secret: 'Test ticket 2020',
  }),
];

export const setAppMiddlewares = (app) => middlewares.forEach((item) => app.use(item));
