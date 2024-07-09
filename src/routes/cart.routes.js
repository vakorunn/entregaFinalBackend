import { Router } from 'express';
import { addToCart } from '../controllers/cart.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/cart', authRequired, addToCart);

export default router;
