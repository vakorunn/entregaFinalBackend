import Cart from '../data/models/cart.model.js';
import Product from '../data/models/product.model.js';

export const addToCart = async (req, res, next) => {
    const { productId } = req.body;
    const { userId } = req.user;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        if (product.owner.toString() === userId) {
            return res.status(400).json({ message: 'No puedes agregar tu propio producto al carrito' });
        }

        const cart = await Cart.findOne({ user: userId });
        cart.products.push(productId);
        await cart.save();

        res.json(cart);
    } catch (error) {
        next({ code: 'CART_ADDITION_ERROR', status: 500, message: error.message });
    }
};
