const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();

function hasUsernameAndPassword(req, res, next) {
  const user = req.body;
  if (!user.username || !user.password) {
    return next({
      code: 400,
      error: 'username and password must be supplied'
    });
  }
  next();
}

router
	// user verification routing
.get('/verify', ensureAuth, (req, res) => {
  res.send({ valid: true });
})
	// user sign-up routing
.post('/signup', bodyParser, hasUsernameAndPassword, (req, res, next) => {
  const data = req.body;
  delete req.body;
  User.find({ username: data.username }).count()
    .then(count => {
      if (count > 0) {
        throw {  // eslint-disable-line
          code: 400,
          error: `username ${data.username} already exists`
        };
      }
      return new User(data).save();
    })     
    .then(user => token.sign(user))
    .then(token => res.send({ token}))
    .catch(next);
})
	// user sign-in verification routing
.post('/signin', bodyParser, hasUsernameAndPassword, (req, res, next) => {
  const data = req.body;
  delete req.body;
  User.findOne({ username: data.username })
			.then(user => {
  if (!user || !user.comparePassword(data.password)) {
    throw {  // eslint-disable-line
      code: 400,
      error: 'invalid username or password'
    };
  }
  return user;
})
			.then(user => token.sign(user))
			.then(token => res.send({ token }))
			.catch(next);
});

module.exports = router;