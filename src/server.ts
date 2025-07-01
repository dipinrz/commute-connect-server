import app from './app';
import { AppDataSource } from './config/database.config';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Initialize database connection before starting server
async function initializeServer() {
  try {
    console.log("🔍 ENV DB Config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD?.slice(0, 4) + '***',
  db: process.env.DB_NAME,
});
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    app.listen(PORT as number, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
}

initializeServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err.message);
  // Close server and exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});