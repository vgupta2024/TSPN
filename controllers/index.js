const express = require('express'),
  router = express.Router();

const Stat = require('../models/stat_model');
const Sport = require('../models/sport_model')
const User = require('../models/user_model')

router.get('/', function(request, response) {
  let sports = Sport.getAllSports();
    let userData = User.getUsers();
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
  data: sports,
  user: request.user,
  userData: userData
});
});
router.get('/login', function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("login", {
    user: request.user,
    data: sports,
    userData: userData
  });
});

router.get('/error', function(request, response) {
  const errorCode = request.query.code;
    let userData = User.getUsers();
  let sports = Sport.getAllSports();
  if (!errorCode) errorCode = 400;
  const errors = {
    '400': "Unknown Client Error",
    '401': "Invlaid Login",
    '404': "Resource Not Found",
    '500': "Server problem"
  }

  response.status(errorCode);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    data: sports,
    user: request.user,
    "errorCode": errorCode,
    "details": errors[errorCode],
      userData: userData
  });
});

module.exports = router
