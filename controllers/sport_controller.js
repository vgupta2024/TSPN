const express = require('express');
const fs = require('fs');
const multer = require('multer');
  router = express.Router();
  const axios = require('axios');
  const dateToday = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }).slice(0,4);


const Sport = require('../models/sport_model');
const User = require('../models/user_model');
const Activity = require('../models/activity_model');


module.exports = router;

router.get('/sport/:sport/:gender/scoreboard', function(request, response) {
    let sports = Sport.getAllSports();
    let sport = request.params.sport;
    let homeScore;
    let awayScore;
      let gender = request.params.gender;
      let userData = User.getUsers();
      for (let games in sports[sport][gender]["UpcomingGames"]) {
        if(parseInt(sports[sport][gender]["UpcomingGames"][games].split("/")[0]) == parseInt(dateToday.split("/")[0]) && parseInt(sports[sport][gender]["UpcomingGames"][games].split("/")[1]) == parseInt(dateToday.split("/")[1]) ) {
        homeScore = sports[sport][gender]["liveScores"][games].split("-")[0];
        console.log(homeScore);
        awayScore = sports[sport][gender]["liveScores"][games].split("-")[1];
      }
    }
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/scoreboard", {
      data: sports,
      sport:sport,
      homeScore: homeScore,
      awayScore: awayScore,
      gender:gender,
      user: request.user,
      userData: userData,
      dateToday: dateToday,
      displayName: userData[request.user._json.email]['displayName']

    });
});

router.get('/sport/addSport', function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/addSport", {
      data: sports,
      user: request.user,
      userData: userData,
      dateToday: dateToday

    });
});

router.get('/sport/result', async function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
      let timeData;
      try {

      const resp = await axios.get('http://worldtimeapi.org/api/timezone/America/New_York');
      let time = resp["data"]["datetime"];
       timeData = time;
    } catch (err) {
       console.error(err);
      time = "";
    }
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/gameResult", {
      data: sports,
      user: request.user,
      userData: userData,
      time: timeData,
      dateToday: dateToday,
    });
});

router.post('/sport/result', function(request, response) {
        let trinity = request.body.Trinity;
        let opponent = request.body.Opponent;
        let upcomingGame = request.body.game;
        let arraySport = upcomingGame.split(" ");
        let sport = [];
        let sportteam;
        for (let i = 0; i < arraySport.length - 1; i++) {
        sport[i] =  arraySport[i];
        }
      sportteam = sport.join(" ");
        let sports = Sport.getAllSports();
        let gender;
        let team;
        for (let sportTeam in sports) {
          for (let genders in sports[sportTeam]) {
          if (sportteam == sportTeam + " " + genders) {
        gender = genders;
        team = sportTeam;

      }
    }
  }
if (parseInt(trinity) > parseInt(opponent)) {
sports[team][gender]["Wins"] += 1;

}
if (parseInt(trinity) < parseInt(opponent)) {
sports[team][gender]["Losses"] += 1;
}

sports[team][gender]["scores"][sports[team][gender]["UpcomingGames"].indexOf(upcomingGame.split(" ")[upcomingGame.split(" ").length-1])] = ("Trinity: " + trinity + " Opponent: " + opponent);
    fs.writeFileSync('data/sports.json', JSON.stringify(sports));
      response.redirect("/");


});

router.post('/sport/addSport', function(request, response) {
        let game = request.body.sport;
        let dateInitial = request.body.date;
        let date = parseInt(dateInitial.split("-")[1]) + "/" + parseInt(dateInitial.split("-")[2]);
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

sports[sport][gender]["UpcomingGames"].push(date);
sports[sport][gender]["GameInfo"].push(" ");
sports[sport][gender]["scores"].push(" ");
sports[sport][gender]["liveScores"].push("0-0");
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
      dateToday: dateToday,
      userData: userData

    });
});




router.post('/sport/removeSport', function(request, response) {
        let game = request.body.game;
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
let index = sports[sport][team]["UpcomingGames"].indexOf(date);
  sports[sport][team]["UpcomingGames"].splice(index,1);
  sports[sport][team]["GameInfo"].splice(index,1);
  sports[sport][team]["scores"].splice(index,1);
  sports[sport][team]["liveScores"].splice(index,1);
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
  } catch (err) {
     console.error(err);
    time = "";
  }
      let userData = User.getUsers();
    let sports = Sport.getAllSports();
    let videoNames = JSON.parse(fs.readFileSync(__dirname+'/../data/videoNames.json'));
    let imageNames = JSON.parse(fs.readFileSync(__dirname+'/../data/imageNames.json'));
    if(sport!="bootstrap-datepicker.XX.js"){
    Activity.addActivity(request.user._json.email, timeData, sport);
  }
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/team", {
      data: sports,
      sport: sport,
      user: request.user,
        userData: userData,
        dateToday: dateToday,
        videoNames: videoNames,
        imageNames: imageNames,
        time: timeData

    });
});
