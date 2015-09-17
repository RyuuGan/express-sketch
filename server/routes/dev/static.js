'use strict';

var router = require('server/routes/dev')
  , express = require('express')
  , conf = require('server/conf');

router.use('/build', express.static(conf.path('build')));
router.use('/public', express.static(conf.path('public')));
