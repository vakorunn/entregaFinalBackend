// logger.js
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, simple } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Logger for development
const devLogger = createLogger({
    level: 'debug',
    format: combine(
        colorize(),
        simple(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console()
    ]
});

// Logger for production
const prodLogger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'errors.log', level: 'error' })
    ]
});

const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export default logger;
