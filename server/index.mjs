import http from 'http';

import express from 'express';

import { setAppMiddlewares, setCoreMiddlewares } from './middlewares';
import { setRoutes } from './routes';

const app = express();

setAppMiddlewares(app);
setCoreMiddlewares(app);
setRoutes(app);

const server = http.createServer(app);

server.listen(4201, () => {
  console.log('Server was started on port: 4201');
});
