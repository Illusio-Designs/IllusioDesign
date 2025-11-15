// Mock database - replace with actual database (MongoDB, PostgreSQL, etc.)
let users = [];

export class User {
  static async findAll() {
    return users.map(({ password, ...user }) => user);
  }

  static async findById(id) {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  }

  static async findByEmail(email) {
    return users.find(u => u.email === email);
  }

  static async create(userData) {
    const user = {
      id: users.length + 1,
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    return user;
  }

  static async updateById(id, updates) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
    const { password, ...safeUser } = users[index];
    return safeUser;
  }

  static async deleteById(id) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    users.splice(index, 1);
    return true;
  }
}
