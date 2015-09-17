'use strict';

var multer = require('multer')
  , conf = require('server/conf');

module.exports = multer({
  dest: conf.storageRoot + '/uploads',
  limits: {
    fileSize: conf.uploadFileSizeLimit
  }
});
