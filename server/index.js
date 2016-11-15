const express = require('express');

const app = express();

// put server on a cluster to make use of many cores

const port = process.env.PORT || 1337;

require('./db/config.js');
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app);

app.listen(port, () => {
  console.log(`Server listens on Port ${port}`);
});

module.exports = app;
