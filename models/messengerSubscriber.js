/**
 *  MessengerSubscriber model 
 */

var mongoose  = require('mongoose')
  , Schema    = mongoose.Schema;

/**
 * MessengerSubscriber Schema
 */

var MessengerSubscriberSchema = new Schema({
    id:            { type: String, unique: true },
    name:           { type: String, default: '' },
    createdAt:     {type: Date, default: new Date()} 
})

module.exports = mongoose.model('MessengerSubscriber', MessengerSubscriberSchema);
