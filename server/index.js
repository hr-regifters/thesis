const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();

// put server on a cluster to make use of many cores

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
