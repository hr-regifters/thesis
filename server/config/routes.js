const concoctionConstructor = require('./routers/constructor');
const userRouter = require('./routers/user');
const oauthRouter = require('./routers/oauth');
const webhookRouter = require('./routers/webhooks');
const checkLogin = require('./utilities/checkLogin');
const concoctions = require('../db/controllers/concoctionController');
const user = require('../db/controllers/userController');
// put routers here

module.exports = (app) => {
  app.use('/api/constructor', checkLogin, concoctionConstructor);
  app.use('/api/user', userRouter);
  app.use('/api/oauth', oauthRouter);
  app.use('/api/webhooks', webhookRouter);
  app.use('/concoctions', concoctions.queryConcoctions);
  app.use('/users', user.queryUsers);
  app.use('/loaderio-63505aef1c99acae4eea09e626d6e2fc/', (req, res) => { res.send('loaderio-63505aef1c99acae4eea09e626d6e2fc'); });  // load testing
  app.get('/*', (req, res) => { res.redirect('/app'); }); // catching gets on invalid routes
};
