const io = require( "socket.io" )();
const Sport = require('../models/sport_model');
const dateToday = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }).slice(0,4);
const fs = require('fs');
const socketapi = {
    io: io
};

io.on('connection', function(socket){
    let sports = Sport.getAllSports();
    socket.on('announcement', function(data) {
      for (let games in sports[data.sport][data.gender]["UpcomingGames"]) {
        if(parseInt(sports[data.sport][data.gender]["UpcomingGames"][games].split("/")[0]) == parseInt(dateToday.split("/")[0]) && parseInt(sports[data.sport][data.gender]["UpcomingGames"][games].split("/")[1]) == parseInt(dateToday.split("/")[1])  ){
        sports[data.sport][data.gender]["liveScores"][games] = data.homeScore + "-" + data.awayScore;
    }
  }
  fs.writeFileSync('data/sports.json', JSON.stringify(sports));
      io.emit('announcement', {
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        sport: data.sport,
        gender: data.gender
      });
    });

    socket.on('connectionEvent', function(data) {
      io.emit('connectionEvent', {
          displayName:data.displayName,
          homeScore: data.homeScore,
          awayScore: data.awayScore,
          numClients: io.engine.clientsCount,
          message: 'Welcome to the Live Scoreboard Feature '
      });
    });

});

module.exports = socketapi;
