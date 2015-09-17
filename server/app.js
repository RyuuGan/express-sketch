'use strict';

var express = require('express')
  , http = require('http')
  , mongoose = require('mongoose')
  , conf = require('server/conf')
  , setup = require('server/setup')
  , debug = require('debug')('yourapp');

var app = module.exports = exports = express();

app.set('trust proxy', true);
app.set('views', conf.path('views'));
app.set('view engine', 'jade');

if (require('debug').enabled('yourapp:http_log')) {
  app.use(require('morgan')('dev'));
}

if (!conf.production)
  app.use(require('server/routes/dev'));

app.use(require('server/routes'));

if (!conf.production)
  app.use(require('errorhandler')());

// Run/shutdown methods

app.run = function (cb) {
  if (!cb)
    cb = function () {};
  app.init(function (err) {
    if (err) return cb(err);
    http.createServer(app).listen(conf.port, conf.ip, function (err) {
      if (err) return cb(err);
      /* eslint-disable no-console*/
      console.log('Visit %s to continue.', conf.host);
      /* eslint-enable no-console*/
      cb();
    });
    process.on('SIGINT', app.shutdown);
    process.on('SIGTERM', app.shutdown);
  });
};

app.init = function (cb) {
  mongoose.connect(conf.mongo.url, function () {
    debug('Connected to MongoDB @ %s', conf.mongo.url);
    setup(cb);
  });
};

app.shutdown = function () {
  mongoose.disconnect(function (err) {
    if (err)
      throw err;
    debug('MongoDB connection closed.');
    process.exit(0);
  });
};
