const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

require('./db/config.js');
require('./config/middleware.js')(app, express);

app.listen(port, () => {
  console.log(`Server listens on Port ${port}`);
});

module.exports = app;
