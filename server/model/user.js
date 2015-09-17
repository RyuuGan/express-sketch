'use strict';

var mongoose = require('mongoose')
  , sha256 = require('shared/utils/sha256')
  , md5 = require('md5');

var User = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    trim: true
  },

  secondName: {
    type: String,
    trim: true,
    default: ''
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /.+@.+\..+/
  },

  _passwordSha256: {
    type: String,
    trim: true,
    required: true
  },

  _createdAt: {
    type: Date,
    default: Date.now
  }

});

User.plugin(require('./plugins/extend'));

User.virtual('avatar').get(function () {
  return '//gravatar.com/avatar/' + md5(this.email) + '?d=mm';
});

User.virtual('title').get(function () {
  var user = this;
  return user.lastName + ' ' + user.firstName + ' ' + user.secondName;
});

User.virtual('password').set(function (password) {
  var user = this;
  user._passwordSha256 = sha256(password);
});

User.index({
  email: 1
}, {
  unique: true
});

module.exports = exports = mongoose.model('User', User);
