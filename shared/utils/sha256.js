var createHash = require('sha.js');

module.exports = exports = function (message) {
  return createHash('sha256').update(message, 'utf-8').digest('hex');
};
