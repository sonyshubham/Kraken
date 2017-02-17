
/**
 * Manage the locals which are variables to be used in all views
 */

var _         = require('lodash')
  , util      = require('util')
  , chalk     = require('chalk')
  , config    = require('../config')();

module.exports = function (req, res, next) {
    // res.locals.flashSuccess = req.flash('success')
    // res.locals.flashError   = req.flash('error')

    if (req.query.debugger) {
        res.locals.unminify = true // used to load assets in the debug mode :)
    }

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'development';
    }

    res.locals.config = config

    // if (req.user) {
    //     if (req.user) {
    //         var user = req.user
    //         var name                 = user.name;
    //         res.locals.currentUser   = user;
    //         console.log(chalk.bgYellow.black('set currentUser'));
    //         res.locals.isAdmin       = (_.indexOf(user.roles, 'admin') > -1);
    //         res.locals.isSeller      = (_.indexOf(user.roles, 'seller') > -1);
    //     }
    // } else {
    //     res.locals.isAdmin  = false;
    //     res.locals.isSeller = false;
    // }

    next();
}