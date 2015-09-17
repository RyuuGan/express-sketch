'use strict';

var conf = require('server/conf')
  , express = require('express');

var router = module.exports = new express.Router();

router.use(require('body-parser').urlencoded({
  extended: true
}));
router.use(require('cookie-parser')(conf.cookies.secret));
router.use(require('alt-session')(conf));
router.use(require('alt-auth')(conf.auth));
router.use(require('server/middleware/xsrf')());

router.get('/', function (req, res) {
  res.render('index');
});
