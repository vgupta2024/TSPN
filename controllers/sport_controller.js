const express = require('express');
const fs = require('fs');
  router = express.Router();

const Sport = require('../models/sport_model');
const User = require('../models/user_model');
router.get('/users', function(request, response) {
  let allUsers = Sport.getAllUsers();
  response.send(allUsers);

});

module.exports = router;


router.get('/sport/uploadHighlights', function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/uploadHighlights", {
      data: sports,
      user: request.user,
      userData: userData

    });
});

router.get('/sport/uploadText', function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/uploadText", {
      data: sports,
      user: request.user,
      userData: userData

    });
    for (let games in sports["Basketball"]["Boys"]["UpcomingGames"]) {
    console.log(games);
  }
});

router.post('/sport/uploadText', function(request, response) {
        let date = request.body.game;
        let info = request.body.information;
        let sports = Sport.getAllSports();
        let index = sports["Basketball"]["Boys"]["UpcomingGames"].indexOf(date);
          console.log("HERE:" + date);
        sports["Basketball"]["Boys"]["GameInfo"][index] = info;

          fs.writeFileSync('data/sports.json', JSON.stringify(sports));
          response.redirect("/");


});

router.get('/sport/:sport', function(request, response) {
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
