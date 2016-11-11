var mongoose = require('../config.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
  Concoctions: [{
    type: Schema.Types.ObjectId,
    ref: 'Concoction'
  }]
});

module.exports = mongoose.model('User', userSchema);