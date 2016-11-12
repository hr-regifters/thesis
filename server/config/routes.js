const concoctionConstructor = require('./routers/constructor');
const userRouter = require('./routers/user');
// put routers here


module.exports = (app) => {
  app.use('/api/constructor', concoctionConstructor);
  app.use('/api/user', userRouter);
};
