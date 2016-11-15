const concoctionConstructor = require('./routers/constructor');
const userRouter = require('./routers/user');
const oauthRouter = require('./routers/oauth');

module.exports = (app) => {
  // app.use('/api/constructor', concoctionConstructor);
  app.use('/api/user', userRouter);
  app.use('/api/oauth', oauthRouter);
  app.get('/', checkLogIn,
    function(req, res) {
      console.log('SUCCESS')
    })
};

const checkLogIn = function(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.session.user || req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};