'use strict';

var router = require('server/routes/dev')
  , stylus = require('stylus')
  , conf = require('server/conf');

router.use('/build', stylus.middleware({
  src: conf.path('stylesheets'),
  dest: conf.path('build'),
  compile: function (css, filename) {
    return stylus(css)
      .set('filename', filename)
      .set('compress', true)
      .set('include css', true)
      .use(require('autoprefixer-stylus')());
  }
}));
