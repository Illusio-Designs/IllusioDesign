// Mock database - replace with actual database
let caseStudies = [];

export class CaseStudy {
  static async findAll() {
    return caseStudies;
  }

  static async findPublished() {
    return caseStudies.filter(cs => cs.published !== false);
  }

  static async findById(id) {
    return caseStudies.find(cs => cs.id === parseInt(id));
  }

  static async findByCategory(category) {
    return caseStudies.filter(cs => cs.category === category && cs.published !== false);
  }

  static async create(caseStudyData) {
    const caseStudy = {
      id: caseStudies.length + 1,
      ...caseStudyData,
      published: caseStudyData.published !== undefined ? caseStudyData.published : true,
      createdAt: new Date().toISOString()
    };
    caseStudies.push(caseStudy);
    return caseStudy;
  }

  static async updateById(id, updates) {
    const index = caseStudies.findIndex(cs => cs.id === parseInt(id));
    if (index === -1) return null;
    
    caseStudies[index] = { ...caseStudies[index], ...updates, updatedAt: new Date().toISOString() };
    return caseStudies[index];
  }

  static async deleteById(id) {
    const index = caseStudies.findIndex(cs => cs.id === parseInt(id));
    if (index === -1) return false;
    
    caseStudies.splice(index, 1);
    return true;
  }
}

