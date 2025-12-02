import { connectDB, sequelize } from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const dropContentTable = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await connectDB();
    
    console.log('🔄 Dropping content table...');
    await sequelize.query(`
      DROP TABLE IF EXISTS content;
    `);
    console.log('✅ content table dropped successfully');
    
    console.log('✅ Table removal completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error dropping table:', error);
    process.exit(1);
  }
};

dropContentTable();

