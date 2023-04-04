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

router.get('/ImageDelete/:imageName', function(request, response) {
    let image = request.params.imageName;
    console.log(image);
      let data = JSON.parse(fs.readFileSync('data/imageNames.json'));
      for(imageName in data){
      if (data[imageName]["filename"] == image) {
  delete data[imageName];
}
  }
      fs.writeFileSync('data/imageNames.json', JSON.stringify(data));
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
