import app from './app.js';
import {connectDB} from './data/db.js'
import logger from './logger.js'

connectDB();
app.listen(3000);
logger.info('Server on port 3000');