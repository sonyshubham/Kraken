var mongoose = require('mongoose')
var Website = mongoose.model('Website')
var Ping = require('../lib/ping')

module.exports = function () {
	console.log("Initializing Ping")
	Website.find({})
	    .then(websites => {
	        websites.forEach(website => {
	            var pingSite = new Ping({
	                url: website.url,
	                timeout: website.pingInterval
	            })
	        })
	    })
}