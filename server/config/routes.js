"use strict"

const concoctionConstructor = require('./routers/constructor');
const userRouter = require('./routers/user');
const oauthRouter = require('./routers/oauth');
const webhookRouter = require('./routers/webhooks');
// put routers here

module.exports = (app) => {
  app.use('/api/constructor', checkLogIn, concoctionConstructor);
  app.use('/api/user', userRouter);
  app.use('/api/oauth', checkLogIn, oauthRouter);
  app.use('/api/webhooks', webhookRouter);
  app.use('/loaderio-63505aef1c99acae4eea09e626d6e2fc/', (req, res) => { res.send('loaderio-63505aef1c99acae4eea09e626d6e2fc'); });
};

const checkLogIn = function(req, res, next) {
  let valid = false;
  for (let key in req.sessionStore.sessions) {
    if (JSON.parse(req.sessionStore.sessions[key]).hasOwnProperty('passport')) {
      valid = true;
    }
  }
  if (valid) {
    next();
  } else {
    res.redirect('/');
  }
};