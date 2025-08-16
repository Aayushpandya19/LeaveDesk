import 'reflect-metadata'; // Required for TypeORM
import app from './app';
import { config } from './config';
import { initializeDatabase } from './config/database';

async function startServer() {
  try {
    // Initialize database connection
    await initializeDatabase();

    // Start Express server
    app.listen(parseInt(config.PORT), () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();