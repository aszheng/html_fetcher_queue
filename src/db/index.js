let mongoose = require('mongoose');

mongoose.connect('mongodb://massdrop:challenge@ds161493.mlab.com:61493/html_fetcher_queue');

let db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

let urlSchema = mongoose.Schema({
  url: {type: String, unique: true, dropDups: true} ,
  timeRequested: Date,
  html: String,
  jobID: Number,
  status: {type: Boolean, default: false}
});

let ticketCounterSchema = mongoose.Schema({
  id: Number,
  count: Number
});

var queueSchema = mongoose.Schema({
  id : Number,
  url : String,
  timeRequested: Date,
  status: {type: Boolean, default: false},
})

let Url = mongoose.model('Url', urlSchema);
let TicketCounter = mongoose.model('TicketCounter', ticketCounterSchema);
let Queue = mongoose.model('Queue', queueSchema);

module.exports = {
  Url: Url,
  Queue: Queue
}