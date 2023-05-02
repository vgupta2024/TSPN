//..............Include Express..................................//
const express = require('express');
const ejs = require('ejs');
const app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
//..............Create an Express server object..................//

//..............Apply Express middleware to the server object....//
app.use(express.json()); //Used to parse JSON bodies (needed for POST requests)
app.use(express.urlencoded());
app.use(express.static('public')); //specify location of static assests
app.set('views', __dirname + '/views'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

app.use(require('./controllers/auth'));
app.use(require('./controllers/index'));
app.use(require('./controllers/archive_controller'));
app.use(require('./controllers/highlight_controller'));
app.use(require('./controllers/sport_controller'));
app.use(require('./controllers/user_controller'));
app.use(require('./controllers/activity_controller'));






//..............Start the server...............................//
const port = process.env.PORT || 3000;
app.set('port', port); //let heroku pick the port if needed

let socketapi =require('./controllers/socketConnections');
socketapi.io.attach(server);//attach sockets to the server

server.listen(port, function() {
  console.log('Server started at http://localhost:'+port+'.')
});
