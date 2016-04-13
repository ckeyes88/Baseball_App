var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PlayerSchema = new Schema({
  playername: String,
  gamestats: [{
    place: String,
    ballsfaced: Number,
    hitcount: Number,
    innings: Number,
    dateplayed: Date
  }]
});

var Player = module.exports = mongoose.model('Player', PlayerSchema);

module.exports.savePlayer = function(player, callback){
  Player.create(player, callback);
}

module.exports.getPlayers = function(callback) {
  Player.find().exec(callback);
}

module.exports.getPlayerByName = function(name, callback) {
  Player.findOne({playername: name}).exec(callback);
}

module.exports.addGameToPlayer = function(name, game, callback) {
  Player.update({playername: name}, {$push: {gamestats:game}}).exec(callback);
}
