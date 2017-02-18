
/**
 * Notification broker
 */

const express  = require('express')
    , util     = require('util')
    , chalk    = require('chalk')
    , _        = require('lodash')
    , mongoose = require('mongoose')
    , request  = require('request')
    , config   = require('../config')()

let NotificationBroker = {}

NotificationBroker.sendNotification = function (opts) {
    // console.log("the opts is");
    // console.log(opts);
    console.log('&&&&&&&&&&&&&&&&&&&&');
    console.log('&&&&&&&&&&&&&&&&&&&&');
    console.log(config.notificationCenter);
    console.log('&&&&&&&&&&&&&&&&&&&&');
    console.log('&&&&&&&&&&&&&&&&&&&&');
    var options = {
        url: config.notifications.api,
        method: 'POST',
        form: opts,
        headers: {
            'token': config.notificationCenter.token
        },
        timeout: 10000 // preventing socket hang ups
    }

    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
        } else {
            console.error(error)
        }
    })
}

module.exports = NotificationBroker;