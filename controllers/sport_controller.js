const express = require('express'),
  router = express.Router();

const Sport = require('../models/sport_model');
const User = require('../models/user_model');
router.get('/users', function(request, response) {
  let allUsers = Sport.getAllUsers();
  response.send(allUsers);

});

module.exports = router;

router.get('/users2', function(request, response) {

   Sport.getAllUsers2(function(userData){
     response.status(200);
     response.setHeader('Content-Type', 'text/html');
     response.send(userData);
   });

});

router.get('/Category/:sport', function(request, response) {
    let sport = request.params.sport;
      let userData = User.getUsers();
    let sports = Sport.getAllSports();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/team", {
      data: sports,
      sport: sport,
      user: request.user,
        userData: userData

    });
    console.log(sport);
});

router.get('/Category/upload', function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/team", {
      data: sports,
      sport: sport,
      user: request.user,
      userData: userData

    });
    console.log(sport);
});
