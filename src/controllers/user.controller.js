import User from '../data/models/user.model.js';

export const togglePremiumStatus = async (req, res, next) => {
    const { uid } = req.params;

    try {
        const user = await User.findById(uid);
        if (!user) return next({ code: 'USER_NOT_FOUND', status: 404 });

        user.role = user.role === 'premium' ? 'user' : 'premium';
        await user.save();

        res.json({ message: 'Rol de usuario actualizado', user });
    } catch (error) {
        next({ code: 'GENERAL_ERROR', status: 500, message: error.message });
    }
};