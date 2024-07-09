import Product from '../data/models/product.model.js';

export const checkOwnership = async (req, res, next) => {
    const { productId } = req.params;
    const { userId, role } = req.user;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        if (role !== 'admin' && product.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Permiso denegado' });
        }

        next();
    } catch (error) {
        next({ code: 'GENERAL_ERROR', status: 500, message: error.message });
    }
};
