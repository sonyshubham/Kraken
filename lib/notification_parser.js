
/**
 * Notifications Module
 */


/**
 * Notification broker
 */

const express  = require('express')
    , util     = require('util')
    , chalk    = require('chalk')
    , mongoose = require('mongoose')
    , MessengerSubscriber = mongoose.model('MessengerSubscriber')
    , config   = require('../config')()


const NotificationBroker = require('./notification_broker')

let Notification = {}

Notification.serverCrashed = '🔥 Your website has crashed, hurry up to put out the fire'

Notification.serverRecovered = '🍻 Your website is now up and running'

Notification.sendNotification = function (opts) {
	console.log('inside sendNotification')
	for (var i in config.notificationChannels) {

		console.log('the notificationChannel is ' + i)
		if (i == 'messenger') {
			this.messengerNotification(opts)
		}
		if (i == 'slack') {
			this.slackNotification(opts)
		}
		if (i == 'email') {
			this.emailNotification(opts)
		}
	}

}

// {
//     messages: [{text: 'your server is down', senderId: '374244096032716'}],
//     token: 'EAAIetSpE6ZBUBAKvOdhic5ZC8ZCzj4rksIqzTXfAi4yZBKXUV243IY13i61OPRs1jF6T2I1GnZBt041mLswS44RvsKWhBXtARdz9bS2LPWg9tRKP3gv35lEXAZAMYZC5Me7pS3kC6fSTQqzuyUf8ryBzb0L4DP8K1Kx7ZCh2tafLdwZDZD',
//     type: 'messenger'
// }

Notification.messengerNotification = function (opts) {
	console.log('inside the notifcation messengerNotification')
	var data = {
		messages: [],
		token: config.notificationChannels.messenger.token,
		type: 'messenger'
	}
	MessengerSubscriber
		.find()
		.then(subscriberIds => {
			console.log('the subscribers are ' + subscriberIds)
			if (subscriberIds.length > 0) {
				subscriberIds.forEach((subscriber) => {
					if (opts.status == 'recovered') {
						data.messages.push({
							text: Notification.serverRecovered,
							senderId: subscriber.id
						})
					} else {
						data.messages.push({
							text: Notification.serverCrashed,
							senderId: subscriber.id
						})
					}
				})
				console.log(chalk.red('Sending notification'))
				console.log(util.inspect(data, {depth: null}))
				NotificationBroker.sendNotification(data)
			}
			
		})
}

// {
//     messages: [
//          {
//              to: 'channel',
//              name: 'dev',
//              message: 'Server down'
//          },
//          {
//              to: 'user',
//              name: 'kaushik',
//              message: 'Server down'
//          },
         
//     ]
//     token: '<your_token>',
//     name: 'Kraken',
//     type: 'slack'
// }

Notification.slackNotification = function (opts) {
	var data = {
		messages: [],
		token: config.notificationChannels.slack.token,
		type: 'slack'
	}
	if (opts.status == 'recovered') {
		data.messages.push({
			to: 'user',
			name: config.notificationChannels.slack.user,
			message: Notification.serverRecovered
		})
	} else {
		data.messages.push({
			to: 'user',
			name: config.notificationChannels.slack.user,
			message: Notification.serverCrashed
		})
	}
	NotificationBroker.sendNotification(data)
}

Notification.emailNotification = function (opts) {
	
}

module.exports = Notification;
