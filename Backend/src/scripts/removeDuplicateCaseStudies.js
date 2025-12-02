import { connectDB } from '../config/db.js';
import CaseStudy from '../models/CaseStudy.js';
import { sequelize } from '../config/db.js';

const removeDuplicates = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await connectDB();
    
    console.log('🔄 Finding duplicate case studies...');
    
    // Find all case studies grouped by title
    const duplicates = await sequelize.query(`
      SELECT title, COUNT(*) as count, GROUP_CONCAT(id ORDER BY id) as ids
      FROM case_studies
      GROUP BY title
      HAVING count > 1
    `, { type: sequelize.QueryTypes.SELECT });
    
    if (duplicates.length === 0) {
      console.log('✅ No duplicates found!');
      process.exit(0);
    }
    
    console.log(`Found ${duplicates.length} titles with duplicates:`);
    
    let deletedCount = 0;
    
    for (const duplicate of duplicates) {
      const ids = duplicate.ids.split(',').map(id => parseInt(id));
      // Keep the first (oldest) one, delete the rest
      const idsToDelete = ids.slice(1);
      
      console.log(`\n📋 Title: "${duplicate.title}"`);
      console.log(`   Keeping ID: ${ids[0]}`);
      console.log(`   Deleting IDs: ${idsToDelete.join(', ')}`);
      
      for (const idToDelete of idsToDelete) {
        await CaseStudy.destroy({ where: { id: idToDelete } });
        deletedCount++;
        console.log(`   ✅ Deleted ID: ${idToDelete}`);
      }
    }
    
    console.log(`\n✅ Removed ${deletedCount} duplicate case studies`);
    console.log('✅ Cleanup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error removing duplicates:', error);
    process.exit(1);
  }
};

removeDuplicates();

