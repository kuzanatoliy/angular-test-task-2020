import { USER_DATA } from '../configs';

export function setAuthMiddlewares(router) {
  router.use(authTreatment);
}

export function authTreatment(req, res, next) {
  const { token } = req.headers;
  if (token && token === USER_DATA.userName) {
    return next();
  }

  return res.status(403).json({ message: 'Forbidden Access' });
}
