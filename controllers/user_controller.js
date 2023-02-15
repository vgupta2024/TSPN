const express = require('express'),
  router = express.Router();

const User = require('../models/user_model');

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
