const express = require('express'),
  router = express.Router();

const Stat = require('../models/stat_model');
const Sport = require('../models/sport_model')

router.get('/', function(request, response) {
  let sports = Sport.getAllSports();
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
  data: sports,
  user: request.user
});
});
router.get('/login', function(request, response) {
    let sports = Sport.getAllSports();
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("login", {
    user: request.user,
    data: sports,
    user: request.user
  });
});

router.get('/error', function(request, response) {
  const errorCode = request.query.code;
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
    "details": errors[errorCode]
  });
});

module.exports = router
