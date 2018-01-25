const path = require('path');

const getNamespace = filename => path.basename(filename, path.extname(filename));

module.exports = {
  getNamespace,
};
