// Mock database - replace with actual database
let teamMembers = [];

export class Team {
  static async findAll() {
    return teamMembers.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  static async findById(id) {
    return teamMembers.find(t => t.id === parseInt(id));
  }

  static async create(teamData) {
    const team = {
      id: teamMembers.length + 1,
      ...teamData,
      order: teamData.order !== undefined ? teamData.order : teamMembers.length + 1,
      createdAt: new Date().toISOString()
    };
    teamMembers.push(team);
    return team;
  }

  static async updateById(id, updates) {
    const index = teamMembers.findIndex(t => t.id === parseInt(id));
    if (index === -1) return null;
    
    teamMembers[index] = { ...teamMembers[index], ...updates, updatedAt: new Date().toISOString() };
    return teamMembers[index];
  }

  static async deleteById(id) {
    const index = teamMembers.findIndex(t => t.id === parseInt(id));
    if (index === -1) return false;
    
    teamMembers.splice(index, 1);
    return true;
  }
}

