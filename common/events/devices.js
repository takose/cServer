const utils = require('./utils');

const ns = utils.getNamespace(__filename);

module.exports = {
  fetchState: `${ns}/state:fetch`,
  fetchStateReturn: `${ns}/state:fetch/return`,
  updateState: `${ns}/state:update`,
  updateStateReturn: `${ns}/state:update/return`,
};
