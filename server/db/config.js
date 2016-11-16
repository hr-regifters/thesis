const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const env = require('./../../env');

const mongoURI = `mongodb://${env.mongoUser}:${env.mongoPassword}@ds149557.mlab.com:49557/regiftersdb`;
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => { console.log('MongoDB connection is open!'); });

// revisit if db or mongoose should be exported
module.exports = mongoose;
