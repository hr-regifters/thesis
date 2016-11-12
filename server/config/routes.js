const concoctionConstructor = require('./routers/constructor');
const userRouter = require('./routers/user');
const oauthRouter = require('./routers/oauth');

module.exports = (app) => {
  // app.use('/api/constructor', concoctionConstructor);
  // app.use('/api/user', userRouter);
  app.use('/api/oauth', oauthRouter);

// const oauthRouter = require('/routers/oauth');
module.exports = (app) => {
  // app.use('/api/constructor', concoctionConstructor);
  app.use('/api/user', userRouter);
  // app.use('/api/oauth', oauthRouter);
};
