import express from 'express';
import connectDB from './config/mongoose';
import magicMoverRoutes from './routes/magicMoverRoutes';
import magicItemRoutes from './routes/magicItemsRoutes';
import errorHandler from './middleware/errorHandler';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const magicMoverSwagger = YAML.load('./src/swagger/magicMover.yml');
const magicItemSwagger = YAML.load('./src/swagger/magicItem.yml');

const app = express();
app.use(express.json());

app.use('/api-docs/magic-movers', swaggerUi.serveFiles(magicMoverSwagger));
app.get('/api-docs/magic-movers', swaggerUi.setup(magicMoverSwagger));

app.use('/api-docs/magic-items', swaggerUi.serveFiles(magicItemSwagger));
app.get('/api-docs/magic-items', swaggerUi.setup(magicItemSwagger));

// Routes
app.use('/api/magic-movers', magicMoverRoutes);
app.use('/api/magic-items', magicItemRoutes);

app.use(errorHandler);

export default app;
