import { connectDB, syncDatabase, sequelize } from '../config/db.js';
import { User, SEO } from '../models/index.js';
import bcrypt from 'bcryptjs';

// Import all models to ensure they're registered
import '../models/index.js';

// Default pages for SEO
const defaultPages = [
  { page: 'home', title: 'Home - Illusio Design', description: 'Creative Design Solutions' },
  { page: 'about', title: 'About Us - Illusio Design', description: 'Learn about Illusio Design' },
  { page: 'career', title: 'Careers - Illusio Design', description: 'Join our team' },
  { page: 'blog', title: 'Blog - Illusio Design', description: 'Latest news and insights' },
  { page: 'case-study', title: 'Case Studies - Illusio Design', description: 'Our portfolio and case studies' },
  { page: 'contact', title: 'Contact Us - Illusio Design', description: 'Get in touch with us' },
  { page: 'privacy', title: 'Privacy Policy - Illusio Design', description: 'Privacy Policy' },
  { page: 'terms', title: 'Terms of Service - Illusio Design', description: 'Terms of Service' },
  { page: 'service-detail', title: 'Services - Illusio Design', description: 'Our services' }
];

export const initDatabase = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await connectDB();
    
    // Fix charset for existing tables to support emojis
    await fixTableCharset();
    
    console.log('🔄 Syncing database tables...');
    await syncDatabase();
    
    console.log('✅ Database tables created/updated successfully');
    
    // Initialize default SEO entries
    await initDefaultSEO();
    
    // Initialize admin user
    await initAdminUser();
    
    console.log('✅ Database initialization completed');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// Fix charset for existing tables to support emojis (utf8mb4)
const fixTableCharset = async () => {
  try {
    console.log('🔄 Checking and fixing table charset for emoji support...');
    
    // Set connection charset
    await sequelize.query("SET NAMES 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'");
    
    // Ensure database default charset/collation is utf8mb4 (helps new tables/columns)
    try {
      const dbName = sequelize.getDatabaseName ? sequelize.getDatabaseName() : (process.env.DB_NAME || process.env.DB_DATABASE);
      if (dbName) {
        await sequelize.query(`
          ALTER DATABASE \`${dbName}\`
          CHARACTER SET utf8mb4
          COLLATE utf8mb4_unicode_ci
        `);
        console.log(`  ✅ Set database ${dbName} charset to utf8mb4`);
      } else {
        console.warn('  ⚠️  Could not determine database name for ALTER DATABASE');
      }
    } catch (error) {
      console.warn('  ⚠️  Could not alter database charset:', error.message);
    }
    
    // Fix blogs table
    try {
      await sequelize.query(`
        ALTER TABLE blogs 
        CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);
      console.log('  ✅ Fixed blogs table charset to utf8mb4');
    } catch (error) {
      if (error.message.includes("doesn't exist")) {
        console.log('  ℹ️  blogs table does not exist yet, will be created with correct charset');
      } else {
        console.warn('  ⚠️  Could not alter blogs table charset:', error.message);
      }
    }
    
    // Fix blogs.content column specifically
    try {
      await sequelize.query(`
        ALTER TABLE blogs 
        MODIFY COLUMN content LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);
      console.log('  ✅ Fixed blogs.content column charset to utf8mb4');
    } catch (error) {
      if (error.message.includes("doesn't exist")) {
        // Table doesn't exist yet, that's fine
      } else {
        console.warn('  ⚠️  Could not alter blogs.content column:', error.message);
      }
    }
    
    // Fix case_studies table
    try {
      await sequelize.query(`
        ALTER TABLE case_studies 
        CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);
      console.log('  ✅ Fixed case_studies table charset to utf8mb4');
    } catch (error) {
      if (error.message.includes("doesn't exist")) {
        console.log('  ℹ️  case_studies table does not exist yet, will be created with correct charset');
      } else {
        console.warn('  ⚠️  Could not alter case_studies table charset:', error.message);
      }
    }
    
    // Fix case_studies.description column specifically
    try {
      await sequelize.query(`
        ALTER TABLE case_studies 
        MODIFY COLUMN description LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);
      console.log('  ✅ Fixed case_studies.description column charset to utf8mb4');
    } catch (error) {
      if (error.message.includes("doesn't exist")) {
        // Table doesn't exist yet, that's fine
      } else {
        console.warn('  ⚠️  Could not alter case_studies.description column:', error.message);
      }
    }
    
    // Fix privacy_policy table
    try {
      await sequelize.query(`
        ALTER TABLE privacy_policy 
        CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);
      console.log('  ✅ Fixed privacy_policy table charset to utf8mb4');
    } catch (error) {
      if (error.message.includes("doesn't exist")) {
        console.log('  ℹ️  privacy_policy table does not exist yet, will be created with correct charset');
      } else {
        console.warn('  ⚠️  Could not alter privacy_policy table charset:', error.message);
      }
    }
    
    // Fix privacy_policy.content column specifically
    try {
      await sequelize.query(`
        ALTER TABLE privacy_policy 
        MODIFY COLUMN content LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);
      console.log('  ✅ Fixed privacy_policy.content column charset to utf8mb4');
    } catch (error) {
      if (error.message.includes("doesn't exist")) {
        // Table doesn't exist yet, that's fine
      } else {
        console.warn('  ⚠️  Could not alter privacy_policy.content column:', error.message);
      }
    }
    
    // Fix terms_of_service table
    try {
      await sequelize.query(`
        ALTER TABLE terms_of_service 
        CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);
      console.log('  ✅ Fixed terms_of_service table charset to utf8mb4');
    } catch (error) {
      if (error.message.includes("doesn't exist")) {
        console.log('  ℹ️  terms_of_service table does not exist yet, will be created with correct charset');
      } else {
        console.warn('  ⚠️  Could not alter terms_of_service table charset:', error.message);
      }
    }
    
    // Fix terms_of_service.content column specifically
    try {
      await sequelize.query(`
        ALTER TABLE terms_of_service 
        MODIFY COLUMN content LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
      `);
      console.log('  ✅ Fixed terms_of_service.content column charset to utf8mb4');
    } catch (error) {
      if (error.message.includes("doesn't exist")) {
        // Table doesn't exist yet, that's fine
      } else {
        console.warn('  ⚠️  Could not alter terms_of_service.content column:', error.message);
      }
    }
    
  } catch (error) {
    console.warn('⚠️  Error fixing table charset (continuing anyway):', error.message);
    // Don't throw - allow server to start even if charset fix fails
  }
};

const initDefaultSEO = async () => {
  try {
    console.log('🔄 Initializing default SEO entries...');
    
    for (const pageData of defaultPages) {
      const [seo, created] = await SEO.findOrCreate({
        where: { page: pageData.page },
        defaults: {
          title: pageData.title,
          description: pageData.description,
          keywords: 'design, creative, branding, web development',
          ogTitle: pageData.title,
          ogDescription: pageData.description
        }
      });
      
      if (created) {
        console.log(`  ✅ Created SEO entry for: ${pageData.page}`);
      } else {
        console.log(`  ℹ️  SEO entry already exists for: ${pageData.page}`);
      }
    }
    
    console.log('✅ Default SEO entries initialized');
  } catch (error) {
    console.error('❌ Error initializing SEO entries:', error);
  }
};

const initAdminUser = async () => {
  try {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'Admin@123';
    
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        email: adminEmail,
        name: 'Admin',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Admin user created successfully');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error initializing admin user:', error);
  }
};

