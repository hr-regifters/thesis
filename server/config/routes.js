const concoctionConstructor = require('./routers/constructor');
const userRouter = require('./routers/user');
const oauthRouter = require('./routers/oauth');
const webhookRouter = require('./routers/webhooks');
const checkLogin = require('./utilities/checkLogin');
// put routers here

module.exports = (app) => {
  app.use('/api/constructor', checkLogin, concoctionConstructor);
  app.use('/api/user', userRouter);
  app.use('/api/oauth', oauthRouter);
  app.use('/api/webhooks', webhookRouter);
  
  app.use('/loaderio-63505aef1c99acae4eea09e626d6e2fc/', (req, res) => { res.send('loaderio-63505aef1c99acae4eea09e626d6e2fc'); });
  app.get('/*', (req, res) => { res.redirect('/'); }); // catching gets on invalid routes
};
