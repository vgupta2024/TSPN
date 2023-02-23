const uuid = require('uuid');
const fs = require('fs');


exports.getAllArchives =  function() {
  let allArchives = JSON.parse(fs.readFileSync(__dirname+'/../data/archives.json'));
  return allArchives;
}
