// Mock database - replace with actual database
let applications = [];

export class Application {
  static async findAll() {
    return applications;
  }

  static async findById(id) {
    return applications.find(a => a.id === parseInt(id));
  }

  static async findByPositionId(positionId) {
    return applications.filter(a => a.positionId === parseInt(positionId));
  }

  static async create(applicationData) {
    const application = {
      id: applications.length + 1,
      ...applicationData,
      status: applicationData.status || 'pending',
      createdAt: new Date().toISOString()
    };
    applications.push(application);
    return application;
  }

  static async updateById(id, updates) {
    const index = applications.findIndex(a => a.id === parseInt(id));
    if (index === -1) return null;
    
    applications[index] = { ...applications[index], ...updates, updatedAt: new Date().toISOString() };
    return applications[index];
  }

  static async deleteById(id) {
    const index = applications.findIndex(a => a.id === parseInt(id));
    if (index === -1) return false;
    
    applications.splice(index, 1);
    return true;
  }
}

