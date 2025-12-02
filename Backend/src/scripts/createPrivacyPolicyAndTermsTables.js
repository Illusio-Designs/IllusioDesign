import { connectDB, sequelize } from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const createTables = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await connectDB();
    
    console.log('🔄 Creating privacy_policy table...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS privacy_policy (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ privacy_policy table created successfully');
    
    console.log('🔄 Creating terms_of_service table...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS terms_of_service (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ terms_of_service table created successfully');
    
    console.log('✅ All tables created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    process.exit(1);
  }
};

createTables();

