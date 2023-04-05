const fs = require('fs');

exports.getAllVideos=  function() {
  let allVideos = JSON.parse(fs.readFileSync(__dirname+'/../data/videoNames.json'));
  return allVideos;
}

exports.getVideoNum=  function() {
  let allVideos = JSON.parse(fs.readFileSync(__dirname+'/../data/videoNames.json'));
  let counter = 0;
  for (video in allVideos){
    counter ++;
  }
  return counter;
}

exports.getAllImages=  function() {
  let allImages = JSON.parse(fs.readFileSync(__dirname+'/../data/imageNames.json'));
  return allImages;
}

exports.getImageNum=  function() {
  let allImages = JSON.parse(fs.readFileSync(__dirname+'/../data/imageNames.json'));
  let counter = 0;
  for (image in allImages){
    counter ++;
  }
  return counter;
}
