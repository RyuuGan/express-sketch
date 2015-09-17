'use strict';

module.exports = exports = function (schema) {

  schema.virtual('pathFromId').get(function () {
    return this.id.substring(0, 2) +
      '/' + this.id.substring(2, 4) +
      '/' + this.id.substring(4);
  });

};
