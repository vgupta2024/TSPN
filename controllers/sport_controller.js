const express = require('express');
const fs = require('fs');
const multer = require('multer');
  router = express.Router();
  const axios = require('axios');

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

let publicStorage1 = multer.diskStorage ({
destination: function (req, file, cb) {
cb(null,'./public/images');
},
filename: function (req, file, cb) {
cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
}
});

let publicUpload1 = multer({ storage: publicStorage1 });

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

router.post('/sport/uploadImages', publicUpload1.single('myFile'), (req, res, next) => {
  const file = req.file;
  let sport = req.body.sport;
  if((file['filename'].split(".")[1]=="jpg")||(file['filename'].split(".")[1]=="png")|| (file['filename'].split(".")[1]=="jpeg")){
  let imageNum = Sport.getImageNum();
  if(imageNum == 'NaN'){
    imageNum = 0;
  }
  if(imageNum == 'undefined'){
    imageNum = 0;
  }
  let images = Sport.getAllImages();
  images[imageNum] = file;
  images[imageNum]['sport'] = sport;
  fs.writeFileSync('data/imageNames.json', JSON.stringify(images));
  res.redirect("/");
}else{
  const error = {
  'httpStatusCode': 400,
  'message': 'Please upload a file with a supported image type (.jpg or .png)'
  }
  res.send (error);
}
});

router.get('/sport/uploadImages', function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/uploadImages", {
      data: sports,
      user: request.user,
      userData: userData

    });
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

router.get('/sport/addSport', function(request, response) {
    let sports = Sport.getAllSports();
      let userData = User.getUsers();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/addSport", {
      data: sports,
      user: request.user,
      userData: userData

    });
});

router.post('/sport/addSport', function(request, response) {
        let game = request.body.sport;
        let dateInitial = request.body.date;
        let date = parseInt(dateInitial.split("-")[1]) + "/" + parseInt(dateInitial.split("-")[2]);
        console.log(date);
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
console.log(gender);
console.log(sport)

sports[sport][gender]["UpcomingGames"].push(date);
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
      userData: userData

    });
});

router.post('/sport/removeSport', function(request, response) {
        let game = request.body.game;
        console.log(game);
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
console.log(team);
console.log(sport)
console.log(sports[sport][team]["UpcomingGames"].indexOf(date));
let index = sports[sport][team]["UpcomingGames"].indexOf(date);
  sports[sport][team]["UpcomingGames"].splice(index,1);
    fs.writeFileSync('data/sports.json', JSON.stringify(sports));
      response.redirect("/");


});

router.get('/HighlightDelete/:videoName', function(request, response) {
  console.log("delete");
    let video = request.params.videoName;
      let data = JSON.parse(fs.readFileSync('data/videoNames.json'));
      for(videoName in data){
      if (data[videoName]["filename"] == video) {
  delete data[videoName];
}
  }
      fs.writeFileSync('data/videoNames.json', JSON.stringify(data));
      response.redirect("/");
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
});

router.post('/sport/uploadText', function(request, response) {
        let s = request.body.game;
        let sport = s.split("|")[0];
        let team = s.split("|")[1];
        let date = s.split("|")[2];
        let info = request.body.information;
        let sports = Sport.getAllSports();
        let index = sports[sport][team]["UpcomingGames"].indexOf(date);
        sports[sport][team]["GameInfo"][index] = info;

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
    console.log(time);
  } catch (err) {
     console.error(err);
    time = "";
  }
      let userData = User.getUsers();
    let sports = Sport.getAllSports();
    let videoNames = JSON.parse(fs.readFileSync(__dirname+'/../data/videoNames.json'));
    let imageNames = JSON.parse(fs.readFileSync(__dirname+'/../data/imageNames.json'));
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("sports/team", {
      data: sports,
      sport: sport,
      user: request.user,
        userData: userData,
        videoNames: videoNames,
        imageNames: imageNames,
        time: timeData

    });
});
