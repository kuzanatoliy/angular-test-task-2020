import { USER_DATA } from '../configs';

import { authTreatment } from '../middlewares/authMiddlewares';

export function setAuthRoutes(router) {
  router.route('/auth/login')
    .post(loginTreatment, userInfoTreatment);

  router.route('/auth/user-info')
    .get(authTreatment, userInfoTreatment);

  router.route('/auth/logout')
    .post(logoutTreatment, userInfoTreatment);
}

export function userInfoTreatment(req, res) {
  res.json(req.session.userData || {});
}

export function loginTreatment(req, res, next) {
  const { userName, password } = req.body;
  if (USER_DATA.userName === userName && USER_DATA.password === password) {
    const { id, userName } = USER_DATA;
    req.session.userData = {
      id,
      token: userName,
      userName,
    };
  }
  next();
}

export function logoutTreatment(req, res, next) {
  req.session.userData = null;
  next();
}
