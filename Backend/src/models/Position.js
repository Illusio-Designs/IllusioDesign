// Mock database - replace with actual database
let positions = [];

export class Position {
  static async findAll() {
    return positions;
  }

  static async findActive() {
    return positions.filter(p => p.isActive !== false);
  }

  static async findById(id) {
    return positions.find(p => p.id === parseInt(id));
  }

  static async create(positionData) {
    const position = {
      id: positions.length + 1,
      ...positionData,
      isActive: positionData.isActive !== undefined ? positionData.isActive : true,
      createdAt: new Date().toISOString()
    };
    positions.push(position);
    return position;
  }

  static async updateById(id, updates) {
    const index = positions.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    
    positions[index] = { ...positions[index], ...updates, updatedAt: new Date().toISOString() };
    return positions[index];
  }

  static async deleteById(id) {
    const index = positions.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    
    positions.splice(index, 1);
    return true;
  }
}

