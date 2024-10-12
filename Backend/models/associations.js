const Blog = require('./Blog');
const SEO = require('./SEO');

const defineAssociations = () => {
  Blog.associate({ SEO });
  SEO.associate({ Blog });
};

module.exports = defineAssociations;