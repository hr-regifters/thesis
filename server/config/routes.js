// const concoctionConstructor = require('./routers/constructor');
// const userRouter = require('./routers/user');
// const oauthRouter = require('./routers/oauth');
const webhookRouter = require('./routers/webhooks');
// put routers here

module.exports = (app) => {
  // app.use('/api/constructor', concoctionConstructor);
  // app.use('/api/user', userRouter);
  // app.use('/api/oauth', oauthRouter);
  app.use('/api/webhooks', webhookRouter);
};
