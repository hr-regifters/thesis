const mongoose = require('../config.js');
const Schema = mongoose.Schema;

const concoctionSchema = new Schema({
  trigger: String,
  triggerOptions: [],
  actions: [],
  actionOptions: []
});

module.exports = mongoose.model('Memory', memorySchema);