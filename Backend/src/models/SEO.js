// Mock database - replace with actual database
let seoData = [];

export class SEO {
  static async findAll() {
    return seoData;
  }

  static async findByPage(page) {
    return seoData.find(s => s.page === page);
  }

  static async findById(id) {
    return seoData.find(s => s.id === parseInt(id));
  }

  static async create(seoDataItem) {
    const seo = {
      id: seoData.length + 1,
      ...seoDataItem,
      createdAt: new Date().toISOString()
    };
    seoData.push(seo);
    return seo;
  }

  static async updateById(id, updates) {
    const index = seoData.findIndex(s => s.id === parseInt(id));
    if (index === -1) return null;
    
    seoData[index] = { ...seoData[index], ...updates, updatedAt: new Date().toISOString() };
    return seoData[index];
  }

  static async updateByPage(page, updates) {
    const index = seoData.findIndex(s => s.page === page);
    if (index === -1) {
      // Create if doesn't exist
      return await this.create({ page, ...updates });
    }
    
    seoData[index] = { ...seoData[index], ...updates, updatedAt: new Date().toISOString() };
    return seoData[index];
  }

  static async deleteById(id) {
    const index = seoData.findIndex(s => s.id === parseInt(id));
    if (index === -1) return false;
    
    seoData.splice(index, 1);
    return true;
  }
}

