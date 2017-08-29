const URL = require('../../db/index.js');
const url = require('url');


module.exports.home = (req, res) => {
  res.send('Welcome to HTML Fetcher. Please submit your URL to /submit/YOURURL')
};

module.exports.submit = (req, res) => {
  let formattedURL = url.parse(req.body.url).protocol ? url.parse(req.body.url).href : `http://${req.body.url}`
  console.log(req.body.url, 'req.body.url', formattedURL,'formattedURL');
  


  res.send('submit route')
};

module.exports.status = (req, res) => {
  res.send('status route')
};

