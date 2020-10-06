import express from 'express';

import { router as authRouter } from './auth';
import { router as profileRouter } from './profile';

export const router = new express.Router();

router.use(authRouter, profileRouter);
