const Project = require('../models/projectModel');

module.exports = {
  up: async () => {
    await Project.sync();
  },
  down: async () => {
    await Project.drop();
  },
};
