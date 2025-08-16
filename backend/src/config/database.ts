import { DataSource } from 'typeorm';
import { config } from './index';
import { User } from '../entities/User';
import { Leave } from '../entities/Leave';
import { LeaveBalance } from '../entities/LeaveBalance';

// TypeORM DataSource configuration
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.DATABASE_URL,
  synchronize: true, // Set to true for development (auto-creates tables), false for production
  logging: true, // Enable logging for debugging
  entities: [User, Leave, LeaveBalance], // Add your entity paths here, e.g., [__dirname + '/../entities/*.ts']
//   migrations: [], // Add migration paths here, e.g., [__dirname + '/../migrations/*.ts']
});

// Function to initialize the connection
export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}