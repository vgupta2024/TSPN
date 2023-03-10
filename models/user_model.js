const fs = require('fs');

exports.getUsers = function(){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  return users;
}

exports.isUser = function(userID){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  if(users[userID] && users[userID]["privileges"].indexOf("user")>=0) return true;
  else return false;
}

exports.makeAdmin = function(userID){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  if(users[userID] && users[userID]["privileges"].indexOf("admin")<0) users[userID]["privileges"].push("admin");
  fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(users));
}
exports.makeCaptain = function(userID){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let sports = JSON.parse(fs.readFileSync(__dirname+'/../data/sports.json'));
  for (sport in sports) {
  if(users[userID] && users[userID]["privileges"].indexOf(sport + " Captain")<0) users[userID]["privileges"].push(sport + " Captain");
}
  fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(users));
}

exports.isAdmin = function(userID){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  if(users[userID] && users[userID]["privileges"].indexOf("admin")>=0) return true;
  else return false;
}

exports.getUser = function(userID){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));

  users[userID].win_percent = (users[userID].win/parseFloat(users[userID].win+users[userID].lose+users[userID].tie) * 100).toFixed(2);
  if(users[userID].win_percent=="NaN") users[userID].win_percent=0;

  return users[userID];
}

exports.createUser =  function (userID, userDisplayName){
  let allusers = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  if(!allusers[userID]){
    let newUser={
      "displayName": userDisplayName,
      "privileges": ["user"]
    }
    allusers[userID] = newUser;
    fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(allusers));
  }
}

exports.updateUser =  function (userName, results){
  let allusers = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));

/*  if(outcome=="user") allusers[userName]["win"]++;
  else if(outcome=="user") allusers[userName]["lose"]++;
  else allusers[userName]["tie"]++;
*/

  fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(allusers));
}

exports.removeUser = function(userID){
  let allusers = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  if(allusers[userID]) delete allusers[userID];
  fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(allusers));
}

exports.addGame = function(userID, results){
  let allusers = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  if(allusers[userID]){
    if(results["outcome"]=="tie") allusers[userID]["tie"]++;
    else if(results["outcome"]=="user") allusers[userID]["win"]++;
    else allusers[userID]["lose"]++;
    allusers[userID]["games"].push(results["gameID"]);
  }
  fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(allusers));
}
