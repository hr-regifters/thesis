const bodyParser = require('body-parser');
const path = require('path');
const passport = require('../db/controllers/passportController');

module.exports = (app, express) => {
  app.use(bodyParser.json()); // potentially add inflate true if a webhook compresses data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/app', express.static(path.join(__dirname, './../../client/dist'))); // the '/app' route
  app.use(express.static(path.join(__dirname, './../../client/landingPage'))); // the main '/' route
  passport(app);
};
