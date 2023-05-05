var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname+'/../data/activity.db');

db.run("PRAGMA foreign_keys = ON;");


exports.getAllActivity =  function(callback) {
db.all('SELECT * FROM usage', function(err, rows){
  if(err){
    console.log(err);
  } else {
  }
  callback(rows);
});
}

exports.addActivity =  function(userID, time, sport) {
  db.run("INSERT INTO usage (user, created_at, sport) VALUES (?,?,?)",
    userID, time, sport,
    function(err) {
    if (err) { throw err;}
  }
);
}
