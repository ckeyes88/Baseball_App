baseballApp.service('playersService', ['$http', function($http) {
  this.getPlayers = function(callback) {
    $http.get('/api/players').success(function (data) {
      callback(data);
    });
  }

  this.addPlayer = function(player, callback) {
    $http.post('/api/players', player).success(function () {
      callback();
    });
  }

  this.addCSVofPlayers = function(players, callback) {
    $http.post('/api/players/multiple', d3.csv.parse(players)).success(function () {
      callback();
    });
  }
}])
