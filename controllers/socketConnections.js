const io = require( "socket.io" )();
const socketapi = {
    io: io
};

io.on('connection', function(socket){

    socket.on('announcement', function(data) {
      console.log('announcement:', data);
      io.emit('announcement', {
        displayName: data.displayName,
        score: data.score
      });
    });

    socket.on('connectionEvent', function(data) {
      console.log('connection:', data.displayName);
      io.emit('connectionEvent', {
          displayName:data.displayName,
          numClients: io.engine.clientsCount,
          message: 'Welcome to the live scoreboard feature!'
      });
    });

});

module.exports = socketapi;
