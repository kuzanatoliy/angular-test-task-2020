import http from 'http';

import express from 'express';

import { setAppMiddlewares, setCoreMiddlewares } from './middlewares';
import { router } from './router';

const app = express();

setAppMiddlewares(app);
setCoreMiddlewares(app);

app.use('/api', router);

const server = http.createServer(app);

server.listen(4201, () => {
  console.log('Server was started on port: 4201');
});
