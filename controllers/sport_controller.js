const express = require('express'),
  router = express.Router();

const User = require('../models/sport_model');

router.get('/users', function(request, response) {
  let allUsers = User.getAllUsers();
  response.send(allUsers);

});

module.exports = router;

router.get('/users2', function(request, response) {

   User.getAllUsers2(function(userData){
     response.status(200);
     response.setHeader('Content-Type', 'text/html');
     response.send(userData);
   });

});

router.get('/Category/:sport', function(request, response) {
    let sport = request.params.sport;
    let sports = User.getAllSports();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/team", {
      data: sports,
      sport: sport

    });
    console.log(sport);
});
