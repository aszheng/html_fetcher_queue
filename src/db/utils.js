const Url = require('./index.js').Url;
const TicketCounter = require('./index.js').TicketCounter;
const Queue = require('./index.js').Queue;

Queue.enqueue = (params, cb) => {
  var newJob = new Queue(params);
  newJob.save( (err, result) => {
    cb(err, result);
  });
}

//Helper function to fetch all tasks in queue
Queue.fetchAll = function(callback){
  Queue.find( {}, function(err, data){
    callback(err, data)
  })
}


Url.update = function(params){
  Url.findOneAndUpdate(
    {url: params.url},
    {html: params.html, status: true},
    function (err, result) {if (err) {throw err};}
  )
  console.log(params.url, 'UPDATED')
}