const fs = require('fs');

exports.getAllUsers = function(){
  fs.readFile('users.json',"utf8", function(err, data){
    let allUsers = JSON.parse(data);
    return allUsers;
  })
}

exports.getAllUsers2 = function(callback) {
   fs.readFile(__dirname+'/../data/users.json', "utf8", function(err, data){
      let allUsers = JSON.parse(data);
      console.log("users2", allUsers)
      callback(allUsers);
   });
}

exports.getAllSports=  function() {
  let allSports = JSON.parse(fs.readFileSync(__dirname+'/../data/sports.json'));
  return allSports;
}
