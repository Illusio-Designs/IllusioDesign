const Blog = require('../models/blogModel');

module.exports = {
  up: async () => {
    await Blog.sync();
  },
  down: async () => {
    await Blog.drop();
  },
};
