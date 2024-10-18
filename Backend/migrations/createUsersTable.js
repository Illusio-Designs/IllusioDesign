const User = require('../models/userModel');

module.exports = {
  up: async () => {
    await User.sync();
  },
  down: async () => {
    await User.drop();
  },
};
