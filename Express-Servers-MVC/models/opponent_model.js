const fs = require('fs');

exports.getOpponents = function(){
  let opponents = JSON.parse(fs.readFileSync(__dirname+'/../data/opponents.json'));
  return opponents;
}

exports.isOpponent = function(opponentName){
  let opponents = JSON.parse(fs.readFileSync(__dirname+'/../data/opponents.json'));
  if(opponents[opponentName]) return true;
  else return false;
}

exports.getSortedOpponents = function(){
  let opponents = JSON.parse(fs.readFileSync(__dirname+'/../data/opponents.json'));
  let opponentArray=[];

  //create an array to use sort, and dynamically generate win percent
  for(name in opponents){
    opponents[name].win_percent = (opponents[name].win/parseFloat(opponents[name].win+opponents[name].lose+opponents[name].tie) * 100).toFixed(2);
    if(opponents[name].win_percent=="NaN") opponents[name].win_percent=0;
    opponentArray.push(opponents[name])
  }
  opponentArray.sort(function(a, b){
    return parseFloat(b.win_percent)-parseFloat(a.win_percent);
  })
  return opponentArray;
}

exports.getOpponent = function(opponentName){
  let opponents = JSON.parse(fs.readFileSync(__dirname+'/../data/opponents.json'));

  opponents[opponentName].win_percent = (opponents[opponentName].win/parseFloat(opponents[opponentName].win+opponents[opponentName].lose+opponents[opponentName].tie) * 100).toFixed(2);
  if(opponents[opponentName].win_percent=="NaN") opponents[opponentName].win_percent=0;

  return opponents[opponentName];
}

exports.createOpponent =  function (opponentName, opponentPhoto){
  let allOpponents = JSON.parse(fs.readFileSync(__dirname+'/../data/opponents.json'));

  let newOpponent={
    "name": opponentName,
    "photo": opponentPhoto,
    "win":0,
    "lose": 0,
    "tie": 0,
  }
  allOpponents[opponentName] = newOpponent;
  fs.writeFileSync(__dirname+'/../data/opponents.json', JSON.stringify(allOpponents));
}

exports.updateOpponent =  function (opponentName, outcome){
  let allOpponents = JSON.parse(fs.readFileSync(__dirname+'/../data/opponents.json'));

  if(outcome=="opponent") allOpponents[opponentName]["win"]++;
  else if(outcome=="player") allOpponents[opponentName]["lose"]++;
  else allOpponents[opponentName]["tie"]++;

  fs.writeFileSync(__dirname+'/../data/opponents.json', JSON.stringify(allOpponents));
}
