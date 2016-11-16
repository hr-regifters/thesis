// const concoctionConstructor = require('./routers/constructor');
// const userRouter = require('./routers/user');
// const oauthRouter = require('./routers/oauth');
const webhookRouter = require('./routers/webhooks');
// put routers here

module.exports = (app) => {
  app.use('/api/constructor', checkLogIn, concoctionConstructor);
  app.use('/api/user', userRouter);
  app.use('/api/oauth', checkLogIn, oauthRouter);
  app.use('/api/webhooks', webhookRouter);
};

const checkLogIn = function(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.session.user || req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};