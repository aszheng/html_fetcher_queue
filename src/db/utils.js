const Url = require('./index.js').Url;
const Queue = require('./index.js').Queue;

//Helper function to add new task to queue
Queue.enqueue = (params, cb) => {
  var newJob = new Queue(params);
  newJob.save( (err, result) => {
    cb(err, result);
  });
}

//Helper function to fetch all tasks in queue
Queue.fetchAll = (cb) => {
  Queue.find( {}, (err, data) => {
    cb(err, data)
  })
}

//Helper function to update Url entry in db with HTML
Url.update = (params) => {
  Url.findOneAndUpdate(
    {url: params.url},
    {html: params.html, status: params.status},
    (err, result) => {if (err) {throw err};}
  )
}