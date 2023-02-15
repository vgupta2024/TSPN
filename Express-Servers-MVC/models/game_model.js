const uuid = require('uuid');
const fs = require('fs');


exports.getAllGames =  function() {
  let allGames = JSON.parse(fs.readFileSync(__dirname+'/../data/games.json'));
  return allGames
}

exports.getSortedGames =  function() {
  let allGames = JSON.parse(fs.readFileSync(__dirname+'/../data/games.json'));
  let gamesArray=[];

  for(game in allGames){
    gamesArray.push(allGames[game])
  }
  gamesArray.sort(function(a, b){
    return new Date(b.date) - new Date(a.date);
  });

  return gamesArray;
}

exports.getGame =  function(gameID) {
  let allGames = JSON.parse(fs.readFileSync(__dirname+'/../data/games.json'));
  return allGames[gameID];
}

exports.playGame =  function(opponent, playerThrow, weather) {
  let opponentThrowChoices=["Paper", "Rock", "Scissors"];
  let opponentThrow = opponentThrowChoices[Math.floor(Math.random() * 3)];

  if(playerThrow===opponentThrow){
    outcome= "tie";
  }else if(playerThrow==="Paper"){
    if(opponentThrow=="Scissors") outcome= "opponent";
    else outcome= "player";
  }else if(playerThrow==="Scissors"){
    if(opponentThrow=="Rock") outcome= "opponent";
    else outcome= "player";
  }else{
    if(opponentThrow=="Paper") outcome= "opponent";
    else outcome="player";
  }
  let allGames = JSON.parse(fs.readFileSync(__dirname+'/../data/games.json'));

  let results={};
  results["opponentName"]=opponent;
  results["opponentThrow"]=opponentThrow;
  results["playerThrow"]=playerThrow;
  results["outcome"] = outcome;
  results["date"] = new Date();

  let newID = uuid.v1();
  allGames[newID] = results;
  fs.writeFileSync(__dirname+'/../data/games.json', JSON.stringify(allGames));

  return results;
}
