'use strict';

var fs = require('fs-extra')
  , done = require('./done')
  , path = require('path')
  , async = require('async');

var symlinks = ['server', 'shared', 'client'];

async.eachSeries(symlinks, function (symlink, cb) {
  var symlinkPath = path.join(__dirname, '..', 'node_modules', symlink);
  fs.exists(symlinkPath, function (exists) {
    if (!exists) {
      return fs.symlink(path.join(__dirname, '..', symlink), symlinkPath, 'dir', cb);
    }
    cb();
  });
}, done);
