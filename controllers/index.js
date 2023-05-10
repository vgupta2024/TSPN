const express = require('express'),
  router = express.Router();
const fs = require('fs');
const axios = require('axios');
const dateToday = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }).slice(0,4);


const Sport = require('../models/sport_model')
const User = require('../models/user_model')

router.get('/updatedIndex', function(request, response) {
  let date = request.query.date;
  let sports = Sport.getAllSports();
    let userData = User.getUsers();
    let videoNames = JSON.parse(fs.readFileSync(__dirname+'/../data/videoNames.json'));
    let imageNames = JSON.parse(fs.readFileSync(__dirname+'/../data/imageNames.json'));

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("UpdatedIndex", {
    data: sports,
    dateToday: dateToday,
    user: request.user,
    userData: userData,
    videoNames: videoNames,
    imageNames: imageNames,
    date: date
  });
});

router.get('/', function(request, response) {
  let sports = Sport.getAllSports();
    let userData = User.getUsers();
    let videoNames = JSON.parse(fs.readFileSync(__dirname+'/../data/videoNames.json'));
    let imageNames = JSON.parse(fs.readFileSync(__dirname+'/../data/imageNames.json'));
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
  data: sports,
  dateToday: dateToday,
  user: request.user,
  userData: userData,
  videoNames: videoNames,
  imageNames: imageNames
});
});


router.get('/login', function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("login", {
    user: request.user,
    dateToday: dateToday,
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
    dateToday: dateToday,
    user: request.user,
    "errorCode": errorCode,
    "details": errors[errorCode],
      userData: userData
  });
});

module.exports = router
