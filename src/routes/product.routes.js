import { Router } from 'express';
import { createProduct, deleteProduct } from '../controllers/product.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { checkOwnership } from '../middlewares/checkOwnership.js';

const router = Router();

router.post('/products', authRequired, createProduct);
router.delete('/products/:productId', authRequired, checkOwnership, deleteProduct);

export default router;
