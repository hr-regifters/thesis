var expect = require('chai').expect;
var mongoClient = require('mongodb').MongoClient;
var UserCTRL = require('../db/controllers/userController');
var User = require('../db/models/userModel');
var Concoction = require('../db/controllers/concoctionController');
var Evernote = require('../db/controllers/evernoteController');
var Slack = require('../db/controllers/slackController');
var request = require('request');
var db = require('../db/config');

describe('It should write username, password, and email to the database', function() {
// TODO edit this line if your database name is not "archive":
var dbName = 'thesisdemo';
var dbUrl = 'mongodb://localhost:27017/' + dbName;

it('Should store requested documents in Mongo', function(done) {

  UserCTRL.signup({body:{username:'troll', password:'troll1', email:'troll2'}})

  // Wait a second for it to be done archiving
  waits(1000);

  runs(function() {
    User.findOne({username: 'troll'}).then(function(user) {
      expect(user.username).to.equal('troll');
      expect(user.email).to.equal('troll2');
    })
  })
})
