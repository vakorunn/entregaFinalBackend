import mongoose from 'mongoose';
import logger from '../logger.js'

export const connectDB = async () => {
	try {
		await mongoose.connect('mongodb://localhost/merndb');
		logger.info('DB is connected');
	} catch (error) {
		logger.error(error);
	}
}