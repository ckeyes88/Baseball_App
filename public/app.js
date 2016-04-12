var baseballApp = angular.module('baseballApp', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/newplayer', {
      templateUrl: 'templates/NewPlayer.html',
      controller: 'NewPlayerCtrl'
    });

    $locationProvider.html5Mode(true);
  });
