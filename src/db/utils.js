const TicketCounter = require('./index.js').TicketCounter;
const Url = require('./index.js').Url;
const Queue = require('./index.js').Queue;

Queue.add = (params, cb) => {
  var newJob = new Queue(params);
  newJob.save( (err, result) => {
    cb(err, result);
  });
}
