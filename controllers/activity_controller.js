const express = require('express'),
router = express.Router();
const fs = require('fs');
const dateToday = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }).slice(0,4);

const Sport = require('../models/sport_model');
const User = require('../models/user_model');
const Activity = require('../models/activity_model');
const plotly = require('plotly');


router.get('/activity', function(request, response) {
    let data = Sport.getAllSports();
    let userData = User.getUsers();
    let userAuthority = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
    let activityData;

    Activity.getAllActivity(function(rows) {
    activityData = rows;

    let xAxis=["Cross Country", "Volleyball", "Tennis", "Water Polo", "Soccer", "Basketball", "Swim", "Wrestling", "Indoor Track and Field", "Volleyball", "Tennis", "Baseball", "Softball", "Golf", "Track and Field", "Lacrosse"];
    let yAxis =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(activity in activityData){
      for(let i = 0; i <= xAxis.length; i++){
        if(activityData[activity]["sport"] == xAxis[i]){
          yAxis[i]++;
      }
    }
  }
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("activity/activity", {
      data: data,
      user: request.user,
      userData: userData,
      userAuthority: userAuthority,
      dateToday: dateToday,
      activityData: activityData,
      xAxis: xAxis,
      yAxis: yAxis
    });

    });

});



module.exports = router;
