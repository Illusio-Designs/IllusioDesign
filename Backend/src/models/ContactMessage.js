// Mock database - replace with actual database
let contactMessages = [];

export class ContactMessage {
  static async findAll() {
    return contactMessages;
  }

  static async findById(id) {
    return contactMessages.find(cm => cm.id === parseInt(id));
  }

  static async findUnread() {
    return contactMessages.filter(cm => cm.status === 'unread');
  }

  static async create(messageData) {
    const message = {
      id: contactMessages.length + 1,
      ...messageData,
      status: messageData.status || 'unread',
      createdAt: new Date().toISOString()
    };
    contactMessages.push(message);
    return message;
  }

  static async updateById(id, updates) {
    const index = contactMessages.findIndex(cm => cm.id === parseInt(id));
    if (index === -1) return null;
    
    contactMessages[index] = { ...contactMessages[index], ...updates, updatedAt: new Date().toISOString() };
    return contactMessages[index];
  }

  static async deleteById(id) {
    const index = contactMessages.findIndex(cm => cm.id === parseInt(id));
    if (index === -1) return false;
    
    contactMessages.splice(index, 1);
    return true;
  }
}

