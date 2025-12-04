import { connectDB, syncDatabase } from '../config/db.js';
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

