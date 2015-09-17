'use strict';

var path = require('path')
  , conf = require('server/conf')
  , utils = require('server/utils')
  , fs = require('fs-extra');

module.exports = exports = function (schema) {

  schema.plugin(require('./pathFromId'));

  schema.virtual('storageRoot').get(function () {
    return path.join(conf.storageRoot, this.dirname);
  });

  schema.methods.getFile = function () {
    var argv = [].slice.call(arguments);
    return path.join.apply(path, [this.storageRoot].concat(argv));
  };

  schema.methods.mkdirp = function (relPath, cb) {
    var dir = this.getFile(relPath);
    fs.ensureDir(dir, function (err) {
      if (err) return cb(err);
      cb(null, dir);
    });
  };

  schema.methods.rmFile = function (relPath, cb) {
    var file = this.getFile(relPath);
    fs.unlink(file, function () {
      utils.cleanEmptyDirs(path.dirname(file), cb);
    });
  };

  schema.methods.sendFile = function (res, path, attachment) {
    if (attachment)
      res.attachment(attachment);
    res.set('X-Accel-Redirect', '/storage/' + this.dirname + '/' + path);
    res.sendStatus(200);
  };

};
