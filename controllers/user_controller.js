const express = require('express'),
router = express.Router();
const fs = require('fs');
  const dateToday = new Date().toJSON().slice(6,10);

const Sport = require('../models/sport_model');
const Archive = require('../models/archive_model');
const User = require('../models/user_model');


router.post('/users', function(request, response) {
        let userEmail = request.body.userEmail;
        let privilege = request.body.privileges;
        let userAuthority = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
        console.log(privilege);
        for (users in userAuthority) {
        if (userEmail != users && privilege.split(" ").length > 1) {
          let userArray = [];

        for (let i = 0; i < (privilege.split(" ").length - 1); i++) {
        userArray.push(privilege.split(" ")[i]);
        }

        let userString  = userArray.join(" ");
        console.log(userString);
        userAuthority[userEmail] =
        {
          "displayName": userEmail.split("@")[0],
          "privileges": ["user","Captain"],
          "sport": userString
        };
      } else if (userEmail != users && privilege == 'admin') {
        console.log("hi");
        userAuthority[userEmail] =
        {
          "displayName": userEmail.split("@")[0],
          "privileges": ["user","admin"],
          "sport": "admin"
        };
      } else if (userEmail == users && privilege.split(" ").length > 1) {
        userAuthority[users]["privileges"] = privilege.split(" ")[1],
          userAuthority[users]["sport"] = privilege.split(" ")[0]
      } else if (userEmail == users && privilege == 'admin'){
        userAuthority[users]["privileges"] = "admin",
          userAuthority[users]["sport"] = "admin"
      }

        }
          fs.writeFileSync('data/users.json', JSON.stringify(userAuthority));
          response.redirect("/");


});

router.get('/users', function(request, response) {
    let data = Sport.getAllSports();
    let userData = User.getUsers();
    let userAuthority = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("privileges/privileges", {
      data: data,
      user: request.user,
      userData: userData,
      userAuthority: userAuthority,
      dateToday: dateToday
    });
});



module.exports = router;
