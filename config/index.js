
/**
 * Load the right ENV config
 */

var chalk = require('chalk')
  , _ = require('lodash');

module.exports = function () {
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'
    return require('./' + process.env.NODE_ENV);
}