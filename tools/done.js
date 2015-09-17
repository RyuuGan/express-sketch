'use strict';

module.exports = function (err) {
  if (err) {
    /* eslint-disable no-console */
    console.log(err);
    /* eslint-enable no-console */
    process.exit(1);
  }
  process.exit(0);
};
