var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var csv = require('csv');
var d3 = require('d3');
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
  var response;
  Player.getPlayerByName(newPlayer.playername, function(err, player) {
    if(err) {
      response = err;
    } else if(player) {
      Player.addGameToPlayer(player.playername, newGame, function(err, message) {
        if(err) {
          response = err;
        } else {
          response = message;
        }
      });
    } else {
      Player.savePlayer(newPlayer, function(err) {
        if (err) {
          response = err;
        } else {
          response = newPlayer;
        }
      });
    }
  });


});

router.post('/players/multiple', function (req, res) {

  req.body.forEach(function(currentPlayer, index, array) {
    var newPlayer = new Player();
    newPlayer.playername = currentPlayer.playername
    var newGame = {
      place: currentPlayer.place,
      ballsfaced: currentPlayer.ballsfaced,
      hitcount: currentPlayer.hitcount,
      innings: currentPlayer.innings,
      dateplayed: new Date(currentPlayer.dateplayed)
    }
    newPlayer.gamestats = [newGame];
    var response;
    Player.getPlayerByName(newPlayer.playername, function(err, player) {
      if(err) {
        response = err;
      } else if(player) {
        Player.addGameToPlayer(player.playername, newGame, function(err, message) {
          if(err) {
            console.log(err);
            response = err;
          } else {
            response = message;
          }
        });
      } else {
        Player.savePlayer(newPlayer, function(err) {
          if (err) {
            console.log(err);

          } else {
            response = newPlayer
          }
        });
      }
    });
    res.send(response);


  });

});

module.exports = router;
