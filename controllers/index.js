const express = require('express'),
  router = express.Router();

const Opponent = require('../models/opponent_model');

router.get('/', function(request, response) {
  let sports = Opponent.getTeams();
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
  data: sports
});
});

router.get('/error', function(request, response) {
  const errorCode = request.query.code;
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
    "errorCode": errorCode,
    "details": errors[errorCode]
  });
});

module.exports = router
