/**
 *  Website model 
 */

var mongoose  = require('mongoose')
  , Schema    = mongoose.Schema;

/**
 * Website Schema
 */

var WebsiteSchema = new Schema({
    url:            String,
    name:           { type: String, default: '' }, 
    pingInterval:   { type: Number, default: 1 },
    isUp:           { type: Boolean, default: true },
    isDown:         { type: Boolean, default: false }
})

WebsiteSchema.statics = {

    updateSiteStatus: function (url, status) {
        if (status == 'up') {
            return this.update({ url: url }, { $set: {isUp: true, isDown: false }}, { new: true }).exec()
        } else {
            return this.update({ url: url }, { $set: {isUp: false, isDown: true }}, { new: true }).exec()
        }
    }
}

module.exports = mongoose.model('Website', WebsiteSchema);
