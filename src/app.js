import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swaggerUiExpress'
import __dirname from './utils/index.js'

import authRoutes from './routes/auth.routes.js';
import mockRoutes from './routes/mock.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

const swaggerOptions = {
    definition: {
        openapi:'3.0.1',
        info: {
            tittle: 'Documentación',
            description: 'API para la gestion de usuarios'
        }
    },
    apis: [`${__dirname}/docs/api/*.yaml`]
};

const specs = swaggerJSDoc(swaggerOptions);

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api',authRoutes);
app.use('/api', mockRoutes);

app.use(errorHandler);

export default app;