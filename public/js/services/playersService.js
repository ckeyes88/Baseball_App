baseballApp.service('playersService', ['$http', function($http) {
  this.getPlayers = function(callback) {
    $http.get('/api/players').success(function (data) {
      callback(data);
    });
  }

  this.addPlayer = function(player, callback) {
    $http.post('/api/players', player).success(function (data) {
      callback(data);
    });
  }
}])
