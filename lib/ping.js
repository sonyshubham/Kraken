const request      = require('request')
	, statusCodes  = require('http').STATUS_CODES
	, mongoose     = require('mongoose')
	, Notification = require('./notification_parser')
	, http         = require('http')	
	, redis 	   = require('redis')
	, redisClient = redis.createClient()
	, Website      = mongoose.model('Website')



function Ping(opts) {
  	this.url = ''
  	this.timeout = 1
  	this.handle = null
  	this.init(opts)
}

Ping.prototype.init = function(opts) {
	var _this = this
	// _this.saveWebsite()
	_this.url = opts.url
	_this.timeout = opts.timeout * 60 * 1000
	console.log("Timeout" + _this.timeout)
	_this.start()
}

Ping.prototype.start = function () {
	var _this = this

	_this.handle = setInterval(function(){
		
		_this.ping(_this.url)

	}, _this.timeout)
}

Ping.prototype.ping = function (url) {
	var _this = this
	console.log("Hitting URL " + url)
	http.get(_this.url, function(res) {
		console.log('Site is up ' + _this.url)
		_this.isUp(_this.url)
	}).on('error', function(e) {
		console.log("Could not load site some error happened")
		_this.isDown(_this.url)
	})
	// try {
	// 	request(url, function(err, response, body) {
	// 		if (err) {
	// 			_this.isDown(url)
	// 		} else {
	// 			_this.isUp(url)
	// 		}
	// 	})
	// }
	// catch(err) {
	// 	_this.isDown(url)
	// }
}

Ping.prototype.isUp = function (url) {
	console.log("Inside is up method")
	var _this = this
	Website.find({url: url})
		.then(websiteFound => {
			if (websiteFound.isDown == true) {
				// sendNotification()
				Notification.sendNotification({
					url: url,
					status: 'recovered'
				})
				return Website.updateSiteStatus(_this.url, 'up')
			}

			return null
		})
		.then(status => {
			console.log("Website is up" + url)
		})
		.catch(err => {
			console.log(err)
		})
}

Ping.prototype.isDown = function (url) {
	console.log("Inside is down method")
	var _this = this
	console.log("website is down" + url)
	// sendNotification()
	// Website
	// 	.updateSiteStatus(url, 'down')
	// 	.then(status => {
	// 		console.log("sending nofification now" + url)
	// 		Notification.sendNotification({
	// 			url: url,
	// 			status: 'crashed'
	// 		})
	// 	})
	// 	.catch(err => {
	// 		next(err)
	// 	})
	Website.updateSiteStatus(url, 'down')
		.then(updatedSite => {
			console.log("Site updatedSite")
			redisClient.get(url, (error, status) => {
				console.log("Trying to get key from redis")
				if(error) console.log(error)
				if(status == 'sent') {
					console.log("Notification sent already")
				} else {
					Notification.sendNotification({
						url: url,
						status: 'crashed'
					})
					redisClient.set(url, 'sent')
				}
			})
		})

}

module.exports = Ping;

