import { USER_DATA } from '../configs';
import express from 'express';

import { authTreatment } from '../middlewares/authMiddlewares';

export const router = new express.Router();

router.post('/auth/login', loginTreatment, userInfoTreatment);
router.get('/auth/user-info', authTreatment, userInfoTreatment);
router.post('/auth/logout', logoutTreatment, userInfoTreatment);

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
