var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var csv = require('csv');
var Player = require('./models/Player');


router.get('/players', function(req, res) {
  Player.getPlayers(function(err, players) {
    res.json(players);
  });
});

router.post('/players', function(req, res) {

  var newPlayer = new Player();
  var newGame = {
    place: '',
    ballsfaced: 0,
    hitcount: 0,
    innings: 0,
    dateplayed: new Date()
  }
  newPlayer.playername = req.body.playername;
  newGame.place = req.body.gamestats.place;
  newGame.ballsfaced = req.body.gamestats.ballsfaced;
  newGame.hitcount = req.body.gamestats.hitcount;
  newGame.innings = req.body.gamestats.innings;
  newGame.dateplayed = new Date(req.body.gamestats.dateplayed);
  newPlayer.gamestats = [newGame];
  console.log(newPlayer);
  Player.savePlayer(newPlayer, function(err) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(newPlayer);
    }
  });

});

module.exports = router;
