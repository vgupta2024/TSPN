const express = require('express');
const fs = require('fs');
const multer = require('multer');
  router = express.Router();

const Sport = require('../models/sport_model');
const User = require('../models/user_model');
router.get('/users', function(request, response) {
  let allUsers = Sport.getAllUsers();
  response.send(allUsers);

});

module.exports = router;

router.get('/users2', function(request, response) {

   Sport.getAllUsers2(function(userData){
     response.status(200);
     response.setHeader('Content-Type', 'text/html');
     response.send(userData);
   });

});

let publicStorage = multer.diskStorage ({
destination: function (req, file, cb) {
cb(null,'./public/videos');
},
filename: function (req, file, cb) {
console.log(file);
cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
}
});

let publicUpload = multer({ storage: publicStorage });

router.post('/Category/uploadHighlights', publicUpload.single('myFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
  const error = {
  'httpStatusCode': 400,
  'message': 'Please upload a file'
  }
  res.send (error);
  }
  res.redirect("/");
});

router.get('/Category/uploadHighlights', function(request, response) {
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

router.get('/Category/uploadText', function(request, response) {
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

router.post('/Category/uploadText', function(request, response) {
        let date = request.body.game;
        let info = request.body.information;
        let sports = Sport.getAllSports();
        let index = sports["Basketball"]["Boys"]["UpcomingGames"].indexOf(date);
          console.log("HERE:" + date);
        sports["Basketball"]["Boys"]["GameInfo"][index] = info;

          fs.writeFileSync('data/sports.json', JSON.stringify(sports));
          response.redirect("/");


});

router.get('/Category/:sport', function(request, response) {
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
