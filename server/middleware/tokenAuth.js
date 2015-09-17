'use strict';

var User = require('server/model/user')
  , sha256 = require('shared/utils/sha256');

module.exports = function () {
  return function (req, res, next) {
    var userId = req.get('ProStore-Auth-UserId');
    if (!userId)
      return next();
    User.findOne({
      _store: res.locals.store,
      _id: userId
    }).exec(function (err, user) {
      if (err) return next(err);
      if (!user)
        return res.sendStatus(401);
      var nonce = req.get('ProStore-Auth-Nonce')
        , providedToken = req.get('ProStore-Auth-Token')
        , correctToken = sha256(nonce + ':' + user.privateToken);
      if (providedToken != correctToken)
        return res.sendStatus(401);
      req.login(user, next);
    });
  };
};
