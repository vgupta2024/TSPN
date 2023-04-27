const io = require( "socket.io" )();
const socketapi = {
    io: io
};

io.on('connection', function(socket){

    socket.on('announcement', function(data) {
      console.log('announcement:', data);
      io.emit('announcement', {
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        sport: data.sport
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
