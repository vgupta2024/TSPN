const fs = require('fs');


exports.getAllSports=  function() {
  let allSports = JSON.parse(fs.readFileSync(__dirname+'/../data/sports.json'));
  return allSports;
}
