const io = require( "socket.io" )();
const Sport = require('../models/sport_model');
const dateToday = new Date().toJSON().slice(6,10);
const fs = require('fs');
const socketapi = {
    io: io
};

io.on('connection', function(socket){
    let sports = Sport.getAllSports();
    socket.on('announcement', function(data) {
    console.log(sports[data.sport][data.gender]["UpcomingGames"]);
      for (let games in sports[data.sport][data.gender]["UpcomingGames"]) {
        if(sports[data.sport][data.gender]["UpcomingGames"][games].split("/")[0] == dateToday.split("-")[0] && sports[data.sport][data.gender]["UpcomingGames"][games].split("/")[1] == dateToday.split("-")[1]  ){
        sports[data.sport][data.gender]["liveScores"][games] = data.homeScore + "-" + data.awayScore;
      console.log('announcement of me:', data);
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
      console.log('connection:', data.displayName);
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