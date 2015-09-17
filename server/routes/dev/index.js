'use strict';

var express = require('express');

module.exports = new express.Router();

require('./browserify');
require('./stylus');
require('./static');
