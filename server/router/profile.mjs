import { PROFILE_LIST } from '../configs';

import express from 'express';

export const router = new express.Router();

router.get('/profile/:id', getProfileTreatment);

function getProfileTreatment(req, res) {
  const { id } = req.params;
  res.json(PROFILE_LIST.find(item => item.userId === id) || {});
}
