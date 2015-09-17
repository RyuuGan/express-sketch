'use strict';

var router = require('server/routes/dev')
  , browserify = require('browserify-middleware');

['main'].forEach(function (name) {
  router.use('/build/' + name + '.js', browserify('client/' + name + '/index.js', {
    debug: false,
    cache: process.env.NODE_ENV == 'test'
  }));
});
