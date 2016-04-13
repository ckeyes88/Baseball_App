baseballApp.controller('UploadCSVCtrl',
  function UploadCSVCtrl($scope, $window, playersService) {
    $scope.submitCSV = function() {
      
      playersService.addCSVofPlayers($scope.players, function() {
        $window.location.href = '/';
      });
    };

  });
