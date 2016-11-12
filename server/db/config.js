const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/thesisdemo');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('db is open!');
});

module.exports = mongoose;