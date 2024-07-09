import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../data/models/user.model.js';
import ResetToken from '../data/models/resetToken.model.js';
import { sendeMail } from '../services/mailService.js';
import { errorDictionary } from '../utils/errorDictionary.js';

export const requestPasswordReset = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return next({ code: 'USER_NOT_FOUND', status: 404 });

        const token = crypto.randomBytes(32).toString('hex');
        const resetToken = new ResetToken({ userId: user._id, token });
        await resetToken.save();

        const resetLink = `http://localhost:3000/api/password-reset/${token}`;
        await sendeMail(user.email, 'Restablecimiento de Contraseña', `Haga clic en el enlace para restablecer su contraseña: ${resetLink}`);

        res.json({ message: 'Correo de restablecimiento enviado' });
    } catch (error) {
        next({ code: 'GENERAL_ERROR', status: 500, message: error.message });
    }
};

export const resetPassword = async (req, res, next) => {
    const { token, newPassword } = req.body;

    try {
        const resetToken = await ResetToken.findOne({ token }).populate('userId');
        if (!resetToken) return next({ code: 'TOKEN_EXPIRED', status: 400 });

        const user = resetToken.userId;
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) return res.status(400).json({ message: 'No se puede usar la misma contraseña' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        await resetToken.deleteOne();

        res.json({ message: 'Contraseña restablecida exitosamente' });
    } catch (error) {
        next({ code: 'GENERAL_ERROR', status: 500, message: error.message });
    }
};
