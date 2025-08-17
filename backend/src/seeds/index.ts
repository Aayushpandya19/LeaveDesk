import dotenv from 'dotenv';
import path from 'path';
import { initializeDatabase } from '../config/database';
import { seedAdminUser } from './admin.seed';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  PORT: process.env.PORT || '3000',
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  EMAIL_HOST: process.env.EMAIL_HOST || '',
  EMAIL_PORT: process.env.EMAIL_PORT || '587',
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
};

// Validate required variables
if (!config.DATABASE_URL) {
  throw new Error('DATABASE_URL is required in .env');
}
if (!config.JWT_SECRET) {
  throw new Error('JWT_SECRET is required in .env');
}

// Initialize database and seed admin user
async function initializeApp() {
  await initializeDatabase();
  await seedAdminUser();
}

initializeApp().catch((error) => {
  console.error('Error initializing application:', error);
  process.exit(1);
});