"use strict"
const cluster = require('cluster');
// heroku will set WEB_CONCURRENCY  = available dyno memory / WEB_MEMORY, can be force set to a certain value in heroku configs
// see: https://devcenter.heroku.com/articles/node-concurrency
const cpus = process.env.WEB_CONCURRENCY || 1; //require('os').cpus().length; // activate the require if a worker for each core is desired

if (cluster.isMaster && cpus > 1) {
  console.log('Starting Node Cluster');

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
      console.log(`Worker ${worker.id} with processid ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
      console.log('Worker ' + worker.id + 'with processid: ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      // mitigation for infinite loop breaking worker sucks one full cpu core
      setTimeout(cluster.fork, 4000);
  });

} else {
  const express = require('express');
  const app = express();

  const port = process.env.PORT || 1337;

  require('./db/config.js');
  require('./config/middleware.js')(app, express);
  require('./config/routes.js')(app);

  app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
  });

  module.exports = app;
}
