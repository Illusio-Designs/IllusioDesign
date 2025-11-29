// Mock database - replace with actual database
let blogs = [];

export class Blog {
  static async findAll() {
    return blogs;
  }

  static async findPublished() {
    return blogs.filter(b => b.published !== false);
  }

  static async findById(id) {
    return blogs.find(b => b.id === parseInt(id));
  }

  static async findBySlug(slug) {
    return blogs.find(b => b.slug === slug && b.published !== false);
  }

  static async create(blogData) {
    const blog = {
      id: blogs.length + 1,
      ...blogData,
      published: blogData.published !== undefined ? blogData.published : true,
      createdAt: new Date().toISOString()
    };
    blogs.push(blog);
    return blog;
  }

  static async updateById(id, updates) {
    const index = blogs.findIndex(b => b.id === parseInt(id));
    if (index === -1) return null;
    
    blogs[index] = { ...blogs[index], ...updates, updatedAt: new Date().toISOString() };
    return blogs[index];
  }

  static async deleteById(id) {
    const index = blogs.findIndex(b => b.id === parseInt(id));
    if (index === -1) return false;
    
    blogs.splice(index, 1);
    return true;
  }
}

