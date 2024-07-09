import Product from '../data/models/product.model.js';
import User from '../data/models/user.model.js';

export const createProduct = async (req, res, next) => {
    const { name, price, description, category, stock } = req.body;
    const { userId } = req.user;

    try {
        const user = await User.findById(userId);
        if (user.role !== 'premium') return res.status(403).json({ message: 'Permiso denegado' });

        const newProduct = new Product({
            name,
            price,
            description,
            category,
            stock,
            owner: user._id
        });

        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        next({ code: 'PRODUCT_CREATION_ERROR', status: 500, message: error.message });
    }
};
