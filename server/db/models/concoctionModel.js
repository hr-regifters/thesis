var mongoose = require('../config.js');
var Schema = mongoose.Schema;

var concoctionSchema = new Schema({
  trigger: String,
  triggerOptions: [],
  actions: [],
  actionOptions: []
});

module.exports = mongoose.model('Memory', memorySchema);