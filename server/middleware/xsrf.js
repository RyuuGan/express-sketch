'use strict';

module.exports = function () {

  return require('alt-xsrf')({

    ignore: function (req) {
      return req.get('ProStore-Auth-UserId') != null;
    }

  });

};
