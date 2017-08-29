const CronJob = require('cron').CronJob;
const axios = require('axios');
const Url = require('../db/index.js').Url;
const Queue = require('../db/index.js').Queue;
const utils = require('../db/utils.js');

let fetchHTML = function(){
  console.log('*** Worker Checking ***')

  Queue
    //get all task in queue 
    .fetchAll( (err, result) => {
      result.forEach( (task) => {
        console.log('Fetching: ' + task.url)

        //get and save HTML. Dequeue from Queue once complete  
        axios
          .get(task.url)
          .then( (results) => {
            Url.update( {url:task.url, html:results.data, status: true} )
            Queue.deleteOne({ url: task.url }, function (err, result) {if (err){throw err}})            
            console.log('Fetched: ' + task.url)
          })
        //If error fetching HTML. Update html with error mesg. Update status as false. Leave in Queue (in case fetch works at leter time) 
          .catch( () => {
            Url.update( {url:task.url, html: `Error fetching ${task.url}, please come back later or submit a new URL`, status: false} )
            console.log('Error Fetching: ' + task.url)
          })
      })
    })
}

// updates every minute
var cron = new CronJob({
  cronTime: '*/1 * * * *',
  onTick: fetchHTML,
  start: true,
  timeZone: 'America/Los_Angeles'
});
