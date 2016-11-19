module.exports = (req, res, next) => {
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
