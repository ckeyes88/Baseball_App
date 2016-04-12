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
