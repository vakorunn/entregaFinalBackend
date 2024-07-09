import { errorDictionary } from './errorDictionary.js';

export const errorHandler = (err, req, res, next) => {
    const errorResponse = errorDictionary[err.code] || errorDictionary.GENERAL_ERROR;
    res.status(err.status || 500).json({
        code: errorResponse.code,
        message: errorResponse.message
    });
}
