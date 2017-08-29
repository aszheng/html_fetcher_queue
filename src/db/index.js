var mongoose = require('mongoose');

mongoose.connect('mongodb://massdrop:challenge@ds161493.mlab.com:61493/html_fetcher_queue');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var urlSchema = mongoose.Schema({
  url: {type: String, unique: true, dropDups: true} ,
  timeRequested: Date,
  html: String,
  status: {type: Boolean, default: false}
});

var URL = mongoose.model('URL', urlSchema);

module.exports = URL; 



var ticketCounterSchema = mongoose.Schema({
  count: Number
});

var TICKETCOUNTER = mongoose.model('TICKETCOUNTER', ticketCounterSchema);

module.exports = URL; 