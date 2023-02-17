const express = require('express'),
  router = express.Router();
const axios = require('axios');

const Game = require('../models/game_model');
const Opponent = require('../models/opponent_model');

router.get('/games/new', function(request, response) {
    let opponents = Opponent.getOpponents();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("game/play", {
      data: opponents
    });
});

router.get('/games/:id', async function(request, response) {
    let opponentName = request.query.opponent;
    let playerThrow = request.query.throw;

    if(Opponent.isOpponent(opponentName)){

      try {
        const resp = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=40.713050&lon=-74.007230&appid=2034c388a5da59a86d07733f688f0e8d&units=imperial');
        weather = resp["data"]["weather"][0]["main"];
       } catch (err) {
          console.error(err);
     	  weather = ""
       }
      let results = Game.playGame(opponentName, playerThrow, weather);
      Opponent.updateOpponent(opponentName, results["outcome"]);
      results["photo"] = Opponent.getOpponent(opponentName)["photo"];
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("game/results", {
        data: results,
        weather: weather
      });
    }else{
      response.redirect('/error?code=404');
    }
});

router.get('/games', function(request, response) {
  let games = Game.getTeams();
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("game/recentGames",{
    games: games
  });
});


module.exports = router;
