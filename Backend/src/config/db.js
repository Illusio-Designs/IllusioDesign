import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        dialectOptions: {
            charset: 'utf8mb4'
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

const syncDatabase = async (force = false) => {
  try {
    if (force) {
      console.warn('⚠️  WARNING: This will drop all tables and recreate them!');
      // Only allow force sync in development
      if (process.env.NODE_ENV === 'development') {
        if (sequelize.getDialect() === 'mysql') {
          await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        }
        await sequelize.sync({ force: true });
        if (sequelize.getDialect() === 'mysql') {
          await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        }
        console.log('✅ Database forcefully synchronized.');
      } else {
        console.error('❌ Force sync is not allowed in production!');
      }
    } else {
      // Try to sync with alter, but catch errors for tables with too many indexes
      try {
        await sequelize.sync({ alter: true });
        console.log('✅ Database tables synchronized.');
      } catch (alterError) {
        // If alter fails due to too many keys, try to sync without alter
        if (alterError.name === 'SequelizeDatabaseError' && 
            alterError.parent?.code === 'ER_TOO_MANY_KEYS') {
          console.warn('⚠️  Alter sync failed due to too many keys. Attempting sync without alter...');
          try {
            // Try to sync without alter - will only create missing tables
            await sequelize.sync({ alter: false });
            console.log('✅ Database tables synchronized (some tables may need manual migration).');
          } catch (syncError) {
            console.error('❌ Sync failed:', syncError.message);
            // Don't throw - allow server to start even if sync has issues
            console.warn('⚠️  Continuing with existing database schema...');
          }
        } else {
          throw alterError;
        }
      }
    }
  } catch (error) {
    console.error('❌ Unable to sync database:', error.message);
    // Don't throw in production - allow server to start with existing schema
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️  Continuing with existing database schema...');
    } else {
      throw error;
    }
  }
};

export {
    sequelize,
    connectDB,
    syncDatabase
};

