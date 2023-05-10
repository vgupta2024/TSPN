const express = require('express'),
router = express.Router();
const axios = require('axios');
const dateToday = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }).slice(0,4);

const Sport = require('../models/sport_model');
const Archive = require('../models/archive_model');
const User = require('../models/user_model');

router.get('/archives', function(request, response) {
    let archives = Archive.getAllArchives();
    let data = Sport.getAllSports();
      let userData = User.getUsers();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("archive/archives", {
      archives: archives,
      data: data,
      user: request.user,
        userData: userData,
        dateToday:dateToday
    });
});



module.exports = router;
