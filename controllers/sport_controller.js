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



let publicStorage = multer.diskStorage ({
destination: function (req, file, cb) {
cb(null,'./public/videos');
},
filename: function (req, file, cb) {
cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
}
});

let publicUpload = multer({ storage: publicStorage });

router.post('/sport/uploadHighlights', publicUpload.single('myFile'), (req, res, next) => {
  const file = req.file;
  let sport = req.body.sport;
  if((file['filename'].split(".")[1]=="mov")||(file['filename'].split(".")[1]=="mp4")){
  let videoNum = Sport.getVideoNum();
  if(videoNum == 'NaN'){
    videoNum = 0;
  }
  if(videoNum == 'undefined'){
    videoNum = 0;
  }
  console.log(videoNum);
  let videos = Sport.getAllVideos();
  videos[videoNum] = file;
  videos[videoNum]['sport'] = sport;
  fs.writeFileSync('data/videoNames.json', JSON.stringify(videos));
  res.redirect("/");
}else{
  if (!file) {
  const error = {
  'httpStatusCode': 400,
  'message': 'Please upload a file with a supported video type (.mov or .mp4)'
  }
  res.send (error);
  }
}
});

router.get('/sport/uploadHighlights', function(request, response) {
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

router.get('/sport/uploadText', function(request, response) {
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

router.post('/sport/uploadText', function(request, response) {
        let date = request.body.game;
        let info = request.body.information;
        let sports = Sport.getAllSports();
        let index = sports["Basketball"]["Boys"]["UpcomingGames"].indexOf(date);
          console.log("HERE:" + date);
        sports["Basketball"]["Boys"]["GameInfo"][index] = info;

          fs.writeFileSync('data/sports.json', JSON.stringify(sports));
          response.redirect("/");


});

router.post('/sport/uploadText', function(request, response) {
        let date = request.body.myFile;
        let info = request.body.information;
        let sports = Sport.getAllSports();
        let index = sports["Basketball"]["Boys"]["UpcomingGames"].indexOf(date);
          console.log("HERE:" + date);
        sports["Basketball"]["Boys"]["GameInfo"][index] = info;

          fs.writeFileSync('data/sports.json', JSON.stringify(sports));
          response.redirect("/");


});

router.get('/sport/:sport', function(request, response) {
    let sport = request.params.sport;
      let userData = User.getUsers();
    let sports = Sport.getAllSports();
    let videoNames = JSON.parse(fs.readFileSync(__dirname+'/../data/videoNames.json'));
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/team", {
      data: sports,
      sport: sport,
      user: request.user,
        userData: userData,
        videoNames: videoNames

    });
    console.log(sport);
});
