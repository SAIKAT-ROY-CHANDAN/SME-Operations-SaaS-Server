/* eslint-disable no-console */
import express, { Application } from 'express';
import { createServer } from 'http';
import config from './app/configs/index';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFoundErrorHandler from './app/middlewares/notFoundErrorHandler';
import { ensureUploadDirs } from './app/utils/ensureUploadDirs';
import cors from 'cors';

const app: Application = express();
const server = createServer(app);

// Request size limit
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));


// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Home route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Election Monitoring System API',
  });
});

// Importing routes
app.use('/api/v1', router);

// Error handling middleware
app.use(globalErrorHandler);

// 404 Not Found middleware
app.use(notFoundErrorHandler);

ensureUploadDirs();

// Running the server
server.listen(config.port, async () => {
  console.log(`Server is running on port ${config.port}`);
});
