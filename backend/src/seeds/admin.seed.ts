import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { UserRole } from '../constants';
import bcrypt from 'bcrypt';

// Function to seed an admin user
export async function seedAdminUser() {
  try {
    // Check if an admin user already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingAdmin = await userRepository.findOne({ where: { role: UserRole.ADMIN } });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create a new admin user
    const adminUser = new User();
    adminUser.firstName = 'Admin';
    adminUser.lastName = 'User';
    adminUser.email = 'admin.leavedesk@yopmail.com';
    adminUser.password = await bcrypt.hash('admin@123', 10); // Hash the password
    adminUser.role = UserRole.ADMIN;

    // Save the admin user to the database
    await userRepository.save(adminUser);
    console.log('Admin user seeded successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
    throw error;
  }
}