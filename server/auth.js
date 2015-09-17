'use strict';

module.exports = exports = {

  findUserById: function (userId, cb) {
    if (!userId)
      return cb();
    require('server/model/user')
      .findOne({ _id: userId })
      .exec(cb);
  },

  getUserId: function (user) {
    return user.id;
  },

  defaultLocation: '/',

  persistence: {
    cookie: {
      name: 'at',
      maxAge: 30 * 60 * 60 * 24 * 1000 // 30 days
    },
    saveToken: function (user, token, cb) {
      var cli = require('server/redis').db(0);
      cli.sadd('User#' + user.id + ':authTokens', token, cb);
    },
    hasToken: function (user, token, cb) {
      var cli = require('server/redis').db(0);
      cli.sismember('User#' + user.id + ':authTokens', token, cb);
    },
    dropToken: function (user, token, cb) {
      var cli = require('server/redis').db(0);
      cli.srem('User#' + user.id + ':authTokens', token, cb);
    },
    clearTokens: function (user, cb) {
      var cli = require('server/redis').db(0);
      cli.del('User#' + user.id + ':authTokens', cb);
    }
  }

};
