var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('activity.db');

db.run("PRAGMA foreign_keys = ON;");
