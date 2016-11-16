const mongoose = require('../config.js');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
  email: {
    type: String,
    unique: true
  },
  slackId: String,
  slackToken: String,
  evernoteToken: String,

  Concoctions: [{
    type: Schema.Types.ObjectId,
    ref: 'Concoction'
  }]
});

module.exports = mongoose.model('User', userSchema);