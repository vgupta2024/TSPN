const express = require('express'),
  router = express.Router();
const axios = require('axios');

const Sport = require('../models/sport_model');
const Archive = require('../models/archive_model');
const Stat = require('../models/stat_model');

router.get('/Category/archives', function(request, response) {
    let archives = Archive.getAllArchives();
    let data = Sport.getAllSports();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("archive/archives", {
      archives: archives,
      data: data
    });
});



module.exports = router;
