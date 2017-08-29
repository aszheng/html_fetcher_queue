var Order = require('../../db/index.js');


module.exports.home = (req, res) => {
  res.send('Welcome to HTML Fetcher. Please submit your URL to /submit/YOURURL')
};

module.exports.submit = (req, res) => {
  res.send('submit route')
};

module.exports.status = (req, res) => {
  res.send('status route')
};

