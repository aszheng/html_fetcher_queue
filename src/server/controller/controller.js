const url = require('url');

const Url = require('../../db/index.js').Url;
const TicketCounter = require('../../db/index.js').TicketCounter;
const Queue = require('../../db/index.js').Queue;

const utils = require('../../db/utils.js');

let jobID = 0;

module.exports.home = (req, res) => {
  res.send('Welcome! Please submit your URL in terminal: " curl -d "url=www.example.com" http://localhost:3000/submit "')
};

module.exports.submit = (req, res) => {
  let formattedURL = url.parse(req.body.url).protocol ? url.parse(req.body.url).href : `http://${req.body.url}`

  Url
    .findOne({url: formattedURL})
    .exec( (err, result) => {
      //if url does not exist in db - save url to db
      if (result === null) {
        let curTime = new Date();
        jobID = jobID + 1;

        let newURL = new Url ({url: formattedURL, timeRequested: curTime, html: '', jobID: jobID, status: false});
        newURL.save( (err, result) => {if (err) {throw err}} )

        Queue.enqueue(
          {id: jobID, url: formattedURL, timeRequested: curTime}, 
          (err, result) => {
            console.log('URL SUBMITTED - Your Ticket Number is: ' + result.id);
            res.send('URL SUBMITTED - Your Ticket Number is: ' + result.id);   
          }
        )        
      //else the url is already in the db and task has returned (success or fail)
      } else if (result.html !== '') {
        res.send('Job is complete. Please check status of jobID: ' + result.jobID)
      //else the url is already in the db, but not complete
      } else {
        res.send('Your job is not ready yet. Please check again in 1 min')
      }
    })
};

module.exports.status = (req, res) => {
  let jobID = Number(req.params['0']);

  Url.findOne({jobID: jobID})
    .exec( (err, result) => {
      //if jobID does not exist
      if (result === null) {
        res.send('jobID is invalid. Please try another jobID')
      //else if the HTML has been fetched - return HTML
      } else if (result.html !== '') {
        res.json(result.html)
      //else if job is still in queue - return job
      } else {
        res.send('JobID: ' + result.jobID + ' is not ready yet. Please check again in 1 min')
      }
    })
};

