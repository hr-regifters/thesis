const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongoUser = process.env.mongoUser || require('./../../env').mongoUser;
const mongoPassword = process.env.mongoPassword || require('./../../env').mongoPassword;

const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@ds149557.mlab.com:49557/regiftersdb`;
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => { console.log('MongoDB connection is open!'); });

// revisit if db or mongoose should be exported
module.exports = mongoose;
