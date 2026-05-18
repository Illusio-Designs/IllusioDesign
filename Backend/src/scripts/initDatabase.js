import { connectDB, syncDatabase, sequelize } from '../config/db.js';
import { User, SEO, Policy, Setting } from '../models/index.js';
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

    // Migrate legacy policy tables into the unified policies table, then
    // drop them once their data is safely present in `policies`.
    await migratePolicies();
    await dropLegacyPolicyTables();

    // Initialize default platform settings
    await initDefaultSettings();

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
    
    // Note: charset fixes for privacy_policy / terms_of_service were removed —
    // those tables are decommissioned and dropped by dropLegacyPolicyTables().

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

// One-time migration: copy the latest privacy_policy / terms_of_service rows
// into the unified `policies` table. The legacy tables are read with raw SQL
// (their Sequelize models have been removed), so this keeps working — and once
// those tables are dropped, the query simply fails and the step is skipped.
// Runs only for a `type` that has no row in `policies` yet.
const legacyPolicyTables = [
  { type: 'privacy', table: 'privacy_policy', label: 'privacy policy' },
  { type: 'terms', table: 'terms_of_service', label: 'terms of service' }
];

const migratePolicies = async () => {
  try {
    console.log('🔄 Migrating legacy policy tables into unified policies table...');

    for (const { type, table, label } of legacyPolicyTables) {
      const existing = await Policy.findOne({ where: { type } });
      if (existing) {
        console.log(`  ℹ️  ${label} already present in policies table`);
        continue;
      }
      try {
        const [rows] = await sequelize.query(
          `SELECT content, lastUpdated FROM \`${table}\` ORDER BY updatedAt DESC LIMIT 1`
        );
        const latest = rows && rows[0];
        if (latest && latest.content) {
          await Policy.create({
            type,
            content: latest.content,
            lastUpdated: latest.lastUpdated || new Date()
          });
          console.log(`  ✅ Migrated ${label} from ${table} into policies table`);
        } else {
          console.log(`  ℹ️  No legacy ${label} to migrate`);
        }
      } catch (error) {
        // Legacy table no longer exists (already dropped) — nothing to migrate.
        console.warn(`  ⚠️  ${table} migration skipped:`, error.message);
      }
    }

    console.log('✅ Policy migration check completed');
  } catch (error) {
    console.warn('⚠️  Policy migration error (continuing anyway):', error.message);
  }
};

// After migration, drop the legacy privacy_policy / terms_of_service tables —
// but ONLY once their data is confirmed present in the unified `policies`
// table. Safe and idempotent: a table is dropped only after its row exists in
// `policies`, and DROP TABLE IF EXISTS is a no-op once the table is gone.
const dropLegacyPolicyTables = async () => {
  try {
    console.log('🔄 Cleaning up legacy policy tables...');

    for (const { type, table, label } of legacyPolicyTables) {
      const migrated = await Policy.findOne({ where: { type } });
      if (!migrated) {
        console.log(`  ⏭️  Keeping ${table} — ${label} not yet migrated into policies`);
        continue;
      }
      try {
        await sequelize.query(`DROP TABLE IF EXISTS \`${table}\``);
        console.log(`  🗑️  Dropped legacy table ${table} (data preserved in policies)`);
      } catch (error) {
        console.warn(`  ⚠️  Could not drop ${table}:`, error.message);
      }
    }

    console.log('✅ Legacy policy table cleanup completed');
  } catch (error) {
    console.warn('⚠️  Legacy table cleanup error (continuing anyway):', error.message);
  }
};

// Default platform settings — created once, never overwritten.
const defaultSettings = [
  { key: 'site_name', value: 'Illusio Designs', category: 'general', label: 'Site name', isPublic: true },
  { key: 'contact_email', value: 'info@illusiodesigns.agency', category: 'contact', label: 'Contact email', isPublic: true },
  { key: 'contact_phone', value: '+91 76000 46416', category: 'contact', label: 'Contact phone', isPublic: true },
  { key: 'contact_address', value: '', category: 'contact', label: 'Office address', isPublic: true },
  { key: 'social_facebook', value: '', category: 'social', label: 'Facebook URL', isPublic: true },
  { key: 'social_instagram', value: '', category: 'social', label: 'Instagram URL', isPublic: true },
  { key: 'social_linkedin', value: '', category: 'social', label: 'LinkedIn URL', isPublic: true },
  { key: 'social_twitter', value: '', category: 'social', label: 'Twitter / X URL', isPublic: true },
  { key: 'ga_measurement_id', value: 'G-5RZ7ZTPGDK', category: 'analytics', label: 'Google Analytics 4 ID', isPublic: true },
  { key: 'facebook_pixel_id', value: '913443784211004', category: 'analytics', label: 'Facebook Pixel ID', isPublic: true },
  { key: 'gtm_id', value: '', category: 'analytics', label: 'Google Tag Manager ID', isPublic: true }
];

const initDefaultSettings = async () => {
  try {
    console.log('🔄 Initializing default platform settings...');
    for (const setting of defaultSettings) {
      const [row, created] = await Setting.findOrCreate({
        where: { key: setting.key },
        defaults: setting
      });
      if (created) {
        console.log(`  ✅ Created setting: ${setting.key}`);
      } else if (setting.value && !row.value) {
        // Backfill: a setting row that already exists but is still empty
        // picks up the new default value (never overwrites a real value).
        await row.update({ value: setting.value });
        console.log(`  ✏️  Backfilled empty setting: ${setting.key}`);
      }
    }
    console.log('✅ Default platform settings initialized');
  } catch (error) {
    console.error('❌ Error initializing platform settings:', error);
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

