const request     = require('request')
    , statusCodes = require('http').STATUS_CODES
    , mongoose    = require('mongoose')
    , Website     = mongoose.model('Website')

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
		
		_this.ping()

	}, _this.timeout)
}

Ping.prototype.ping = function () {
	var _this = this
	console.log("Hitting URL " + _this.url)
	
	try {
		request(_this.url, function(err, response, body) {
			console.log("Error" + err)
			console.log("Body" + body)
			console.log("Status " + response.statusCode)
			if (!err && response.statusCode === 200) {
				_this.isUp()
			} else {
				_this.isDown()
			}
		})
	}
	catch(err) {
		_this.isDown()
	}
}

Ping.prototype.isUp = function () {
	var _this = this
	Website.find({url: _this.url})
		.then(websiteFound => {
			if(websiteFound.isDown == true) {
				// sendNotification()
				Website.updateSiteStatus(_this.url, 'up')
				console.log("Website is up" + _this.url)
			}
		})
		.catch(err => {
			next(err)
		})
}

Ping.prototype.isDown = function () {
	var _this = this
	console.log("website is down" + _this.url)
	// sendNotification()
	Website.updateSiteStatus(_this.url, 'down')
}

module.exports = Ping;

