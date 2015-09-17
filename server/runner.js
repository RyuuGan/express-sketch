'use strict';

var cluster = require('cluster')
  , conf = require('server/conf');

module.exports = function () {
  if (cluster.isMaster) {
    for (var i = 0; i < conf.workers; i++)
      cluster.fork();
    cluster.on('exit', function (worker) {
      if (!worker.suicide)
        cluster.fork();
    });
  } else {
    require('server/app').run(function (err) {
      if (err) {
        /* eslint-disable no-console */
        console.trace(err);
        /* eslint-enable no-console */
        process.exit(1);
      }
    });
  }
};

