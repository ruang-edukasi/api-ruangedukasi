const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(5);

  return bcrypt.hash(password, salt);
};

module.exports = {
  encryptPassword,
};
