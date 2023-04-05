const express = require('express');
const fs = require('fs');
const multer = require('multer');
  router = express.Router();
  const axios = require('axios');

const Sport = require('../models/sport_model');
const User = require('../models/user_model');


module.exports = router;

router.get('/sport/addSport', function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/addSport", {
      data: sports,
      user: request.user,
      userData: userData

    });
});

router.post('/sport/addSport', function(request, response) {
        let game = request.body.sport;
        let dateInitial = request.body.date;
        let date = parseInt(dateInitial.split("-")[1]) + "/" + parseInt(dateInitial.split("-")[2]);
        console.log(date);
        let sports = Sport.getAllSports();
        let gender;
        let sport;
        for (let sportTeam in sports) {
          for (let genders in sports[sportTeam]) {
          if (game == sportTeam + " " + genders) {
        gender = genders;
        sport = sportTeam;
      }
    }
  }
console.log(gender);
console.log(sport)

sports[sport][gender]["UpcomingGames"].push(date);
sports[sport][gender]["GameInfo"].push(" ");
    fs.writeFileSync('data/sports.json', JSON.stringify(sports));
      response.redirect("/");


});

router.get('/sport/removeSport', function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/removeSport", {
      data: sports,
      user: request.user,
      userData: userData

    });
});

router.post('/sport/removeSport', function(request, response) {
        let game = request.body.game;
        console.log(game);
        let sports = Sport.getAllSports();
        let team;
        let sport;
        let date;
        for (let sportTeam in sports) {
          for (let teams in sports[sportTeam]) {
            for (let games in sports[sportTeam][teams]["UpcomingGames"]) {
          if (game == sportTeam + " " + teams + " " + sports[sportTeam][teams]["UpcomingGames"][games]) {
        team = teams;
        sport = sportTeam;
        date = sports[sportTeam][teams]["UpcomingGames"][games];
      }
    }
  }
}
console.log(team);
console.log(sport)
console.log(sports[sport][team]["UpcomingGames"].indexOf(date));
let index = sports[sport][team]["UpcomingGames"].indexOf(date);
  sports[sport][team]["UpcomingGames"].splice(index,1);
  sports[sport][team]["GameInfo"].splice(index,1);
    fs.writeFileSync('data/sports.json', JSON.stringify(sports));
      response.redirect("/");


});


router.get('/sport/:sport', async function(request, response) {
    let sport = request.params.sport;
    let timeData;
    try {

    const resp = await axios.get('http://worldtimeapi.org/api/timezone/America/New_York');
    let time = resp["data"]["datetime"];
     timeData = time;
    console.log(time);
  } catch (err) {
     console.error(err);
    time = "";
  }
      let userData = User.getUsers();
    let sports = Sport.getAllSports();
    let videoNames = JSON.parse(fs.readFileSync(__dirname+'/../data/videoNames.json'));
    let imageNames = JSON.parse(fs.readFileSync(__dirname+'/../data/imageNames.json'));
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/team", {
      data: sports,
      sport: sport,
      user: request.user,
        userData: userData,
        videoNames: videoNames,
        imageNames: imageNames,
        time: timeData

    });
});
