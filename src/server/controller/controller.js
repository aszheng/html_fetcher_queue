const url = require('url');

const Url = require('../../db/index.js').Url;
const TicketCounter = require('../../db/index.js').TicketCounter;
const Queue = require('../../db/index.js').Queue;

const utils = require('../../db/utils.js');

let jobID = 0;

module.exports.home = (req, res) => {
  res.send('Welcome to HTML Fetcher. Please submit your URL to /submit/YOURURL')
};

module.exports.submit = (req, res) => {
  let formattedURL = url.parse(req.body.url).protocol ? url.parse(req.body.url).href : `http://${req.body.url}`

  Url.findOne({url: formattedURL})
    .exec( (err, result) => {

      let curTime = new Date()
      
      //if result is null - save url to db
      if (result === null) {
        jobID = jobID + 1;
        console.log('jobID', jobID)

        var newURL = new Url ({url: formattedURL, timeRequested: curTime, html: '', jobID: jobID, status: false});
        newURL.save( (err, result) => {if (err) {throw err}} )

        Queue.add({id: jobID, url: formattedURL, timeRequested: curTime}, (err, result) => {
          console.log('URL SUBMITTED - Your Ticket Number is: ' + result.id)
          res.send('URL SUBMITTED - Your Ticket Number is: ' + result.id)       
        })        
      //else the url is already in the db - return status
      } else {

        console.log('Your job is not ready yet. Please check again in 1 min')
        res.send('Your job is not ready yet. Please check again in 1 min')
      }
    })

};

module.exports.status = (req, res) => {
  let jobID = Number(req.params['0']);

  Url.findOne({jobID: jobID})
    .exec( (err, result) => {
      //if result is null - respond no ID
      if (result === null) {
        res.send('Your jobID is invalid')
      //else if the HTML has been fetched - return HTML
      } else if (result.html !== '') {
        res.json(result.html)
      //else if job is still in queue - return job
      } else {
        res.send('JobID: ' + result.jobID + ' is not ready yet. Please check again in 1 min')
      }
    })
};

