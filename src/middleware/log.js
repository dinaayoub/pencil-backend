'use strict';

function log(req, res, next) {
  //on a live server we might want to store this info in a db with things like the IP of who is retrieving the data, any authentication requirements... etc
  // if we will keep it as a console log we might want to get rid of the "query" portion so it doesn't get too noisy
  console.log(`__REQUEST__ ${req.method} ${req.path} query = "${req.query.q}"`);
  next();
}

module.exports = log;