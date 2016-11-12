const concoctionConstructor = require('./routers/constructor');
const userRouter = require('./routers/user');
const oauthRouter = require('./routers/oauth');
// put routers here

module.exports = (app) => {
  app.use('/api/constructor', concoctionConstructor);
  app.use('/api/user', userRouter);
  app.use('/api/oauth', oauthRouter);
};
