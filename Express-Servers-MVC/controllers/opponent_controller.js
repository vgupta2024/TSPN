const express = require('express'),
  router = express.Router();

const Opponent = require('../models/opponent_model');

router.get('/opponents', function(request, response) {
  let opponentArray = Opponent.getSortedOpponents();

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("opponent/opponentScores",{
    opponents: opponentArray
  });
});

router.get('/opponents/new', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("opponent/opponentCreate");
});

router.get('/opponents/:id', function(request, response) {
  let opponentName = request.params.id;
  let opponent = Opponent.getOpponent(opponentName);

  if(opponent){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("opponent/opponentDetails",{
      opponent: opponent
    });
  }else{
    response.redirect('/error?code=404');
  }
});

router.post('/opponents', function(request, response) {
    let opponentName = request.body.opponentName;
    let opponentPhoto = request.body.opponentPhoto;
    if(opponentName&&opponentPhoto){
      Opponent.createOpponent(opponentName, opponentPhoto);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/opponents/"+opponentName);
    }else{
      response.redirect('/error?code=400');
    }
});

module.exports = router;
