const CronJob = require('cron').CronJob;
const axios = require('axios');
const Url = require('../db/index.js').Url;
const Queue = require('../db/index.js').Queue;
const utils = require('../db/utils.js');

let fetchHTML = function(){
  console.log('TEST')

  //get all task in queue 
  Queue
    .fetchAll( (err, result)=> {
      result.forEach( (task) => {
        console.log(task.url)

        axios
          .get(task.url)
          .then( (results)=>{
            console.log('axios updating', task.url)
            Url.update( {url:task.url, html:results.data} )
            Queue.deleteOne({ url: task.url }, function (err, result) {if (err){throw err}})            
          })

      })

      //for each task
    })
      //get the HTML
      //save it DB
      //dequeue

}

// updates every minute
var cron = new CronJob({
  cronTime: '*/1 * * * *',
  onTick: fetchHTML,
  start: true,
  timeZone: 'America/Los_Angeles'
});
