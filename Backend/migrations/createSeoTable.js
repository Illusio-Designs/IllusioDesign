const Seo = require('../models/seoModel');

module.exports = {
  up: async () => {
    await Seo.sync();
  },
  down: async () => {
    await Seo.drop();
  },
};
