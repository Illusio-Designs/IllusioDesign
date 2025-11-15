// Mock database - replace with actual database
let contents = [
  { id: 1, title: 'Welcome', body: 'Public content for website users', published: true, createdAt: new Date().toISOString() },
  { id: 2, title: 'About Us', body: 'Learn more about us', published: true, createdAt: new Date().toISOString() }
];

export class Content {
  static async findAll() {
    return contents;
  }

  static async findPublished() {
    return contents.filter(c => c.published);
  }

  static async findById(id) {
    return contents.find(c => c.id === id);
  }

  static async create(contentData) {
    const content = {
      id: contents.length + 1,
      ...contentData,
      createdAt: new Date().toISOString()
    };
    contents.push(content);
    return content;
  }

  static async updateById(id, updates) {
    const index = contents.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    contents[index] = { ...contents[index], ...updates, updatedAt: new Date().toISOString() };
    return contents[index];
  }

  static async deleteById(id) {
    const index = contents.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    contents.splice(index, 1);
    return true;
  }
}
