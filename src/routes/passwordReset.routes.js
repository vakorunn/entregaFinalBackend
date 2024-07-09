import { Router } from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/passwordReset.controller.js';

const router = Router();

router.post('/password-reset/request', requestPasswordReset);
router.post('/password-reset', resetPassword);

export default router;
