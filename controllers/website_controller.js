const chalk    = require('chalk')
    , mongoose = require('mongoose')
    , express  = require('express')
    , router   = express.Router()
    , Website  = mongoose.model('Website')
    , MessengerSubscriber  = mongoose.model('MessengerSubscriber')
    , util 	   = require('util')
    , Ping     = require('../lib/ping')

router.post('/create-website', (req, res, next) => {
	console.log(chalk.red(util.inspect(req.body, {depth: null})))
	req.body.timeout = Number(req.body.timeout)
	console.log(typeof req.body.timeout)
	var website = new Website(req.body)
	website.save()
		.then(savedWebsite => {
			var pingSite = new Ping({
				url: savedWebsite.url,
				timeout: savedWebsite.pingInterval
			})
		})
		.then(() => {
			res.send('Done')
		}) 
		.catch(err => {
			next(err)
		})
})

router.get('/send-notifications', function (req, res, next) {
    console.log("getting sending notifications");
    if (req.query['hub.verify_token'] === 'hope_is_a_good_thing_and_maybe_the_best_of_things_and_no_good_thing_ever_dies') {
        return res.send(req.query['hub.challenge'])
    } else {
        return res.send('Error, wrong token')
    }
})

router.post('/send-notifications', function (req, res, next) {
	var senderId = req.body.entry[0].messaging[0].sender.id
	MessengerSubscriber
		.findOne({id: senderId})
		.then(subscriber => {
			if (!subscriber) {
				var	messengerSubscriber = new MessengerSubscriber()
				messengerSubscriber.id = senderId
				return messengerSubscriber.save()
			} else {
				return null
			}
		})
		.then(savedSubscriber => {
			return res.json(savedSubscriber)
		})
		.catch(err => {
			next(err)
		})

})

module.exports = router;