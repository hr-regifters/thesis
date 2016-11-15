const mongoose = require('../config.js');
const Schema = mongoose.Schema;

//solution currently only handles 1 action for 1 trigger
const slackTriggerSchema = new Schema({
  trigger: {
    type: String,
    index: true,
    unique: true
  },
  action: [{
    slackUserId: String,
    actionApi: String,
    actionKey: String,
    actionFunction: String,
    actionParams: [{}],
  }]
  
});

module.exports = mongoose.model('slackTrigger', slackTriggerSchema);