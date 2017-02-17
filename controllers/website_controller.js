const chalk    = require('chalk')
    , mongoose = require('mongoose')
    , express  = require('express')
    , router   = express.Router()
    , Website  = mongoose.model('Website')
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

module.exports = router;