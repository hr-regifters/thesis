var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost/thesisdemo';
mongoose.connect(mongoURI);
var db = mongoose.connection;