baseballApp.controller('NewPlayerCtrl',
  function NewPlayerCtrl($scope, $window, playersService) {
    $scope.savePlayer = function() {
      playersService.addPlayer($scope.player, function() {
        $window.location.href = '/';
      });
    };

  });
