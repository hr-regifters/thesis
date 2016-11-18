var expect = require('chai').expect;
var mongoClient = require('mongodb').MongoClient;
var UserCTRL = require('../db/controllers/userController');
var User = require('../db/models/userModel');
var Concoction = require('../db/controllers/concoctionController');
var Evernote = require('../db/controllers/evernoteController');
var Slack = require('../db/controllers/slackController');
var request = require('request');
var db = require('../db/config');

describe('Kyle feeds top lane', function() {
// TODO edit this line if your database name is not "archive":
var dbName = 'thesisdemo';
var dbUrl = 'mongodb://localhost:27017/' + dbName;

it('Should store requested documents in Mongo', function(done) {

  /* TODO edit these variables to match the interface of your
   * archive server. */
  var archiveServer = 'http://127.0.0.1:1337/api/user/signup';
  var archiveForm = {username: 'simba', password: 'littlemermaid', email: 'google.com'};

  // Post a message to the archive server:
  request({
    method: 'POST',
    uri: archiveServer,
    form: archiveForm
  }, function(error, response, body) {
    /* Now if we look in the database, we should find the
     * posted message there. */

    // Wait a second for it to be done archiving
    waits(1000);

    runs(function() {
      User.findOne({username: 'simba'}).then(function(user) {
        expect(user.username).to.equal('simba');
      })
    })
  })
})
})
