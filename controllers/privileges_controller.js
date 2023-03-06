const express = require('express'),
router = express.Router();
const fs = require('fs');

const Sport = require('../models/sport_model');
const Archive = require('../models/archive_model');
const Stat = require('../models/stat_model');
const User = require('../models/user_model');


router.post('/privileges', function(request, response) {
        let userEmail = request.body.userEmail;
        let privilege = request.body.privileges;
        let userAuthority = JSON.parse(fs.readFileSync(__dirname+'/../data/userAuthority.json'));
        for (users in userAuthority) {
        if (userEmail != users) {
        userAuthority[userEmail] =
        {
          "authority": privilege
        };
      } else {
      userAuthority[users]["authority"] = privilege;
      }
        }
          fs.writeFileSync('data/userAuthority.json', JSON.stringify(userAuthority));
          response.redirect("/");


});

router.get('/privileges', function(request, response) {
    let data = Sport.getAllSports();
    let userData = User.getUsers();
    let userAuthority = JSON.parse(fs.readFileSync(__dirname+'/../data/userAuthority.json'));
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("privileges/privileges", {
      data: data,
      user: request.user,
      userData: userData,
      userAuthority: userAuthority
    });
});



module.exports = router;
