const cluster = require('cluster');
// heroku will set WEB_CONCURRENCY  = available dyno memory / WEB_MEMORY, can be force set to a certain value in heroku configs
// see: https://devcenter.heroku.com/articles/node-concurrency
var cpus = process.env.WEB_CONCURRENCY || require('os').cpus().length;

if (cluster.isMaster && cpus > 1) {
  console.log('Starting Node Cluster');

  for (var i = 0; i < cpus; i++) {
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
  const https = require('https');
  const http = require('http');
  const fs = require('fs');
  const app = express();

  const port = process.env.PORT || 1337;

  // const credentials = {
  //    key  : fs.readFileSync('./../credentials/key.pem'),
  //    cert : fs.readFileSync('./../credentials/cert.pem')
  // };

  require('./db/config.js');
  require('./config/middleware.js')(app, express);
  require('./config/routes.js')(app);

  app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
  });

  // http.createServer(app).listen(port, () => {
  //   console.log(`Http listens on Port ${port}`);
  // });
  // https.createServer(credentials, app).listen(port, () => {
  //    console.log(`Https listens on Port ${port}`);
  // });

  module.exports = app;
}
