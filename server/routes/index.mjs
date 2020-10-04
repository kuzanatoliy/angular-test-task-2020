import { setAuthRoutes } from './auth';

const setters = [
  setAuthRoutes,
];

export function setRoutes(router) {
  setters.forEach((item) => item(router));
}
