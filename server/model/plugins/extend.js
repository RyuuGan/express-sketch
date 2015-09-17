'use strict';

module.exports = exports = function (schema) {

  schema.methods.extend = function (obj) {
    var self = this;
    Object.keys(obj).forEach(function (key) {
      if (key.indexOf('_') != 0) {
        self[key] = obj[key];
      }
    });
    return self;
  };

};
