import { Router } from 'express';
import { togglePremiumStatus } from '../controllers/user.controller.js';

const router = Router();

router.patch('/premium/:uid', togglePremiumStatus);

export default router;