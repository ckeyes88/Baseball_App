var baseballApp = angular.module('baseballApp', ['ngRoute', 'nvd3'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/newplayer', {
      templateUrl: 'templates/NewPlayer.html',
      controller: 'NewPlayerCtrl'
    })
    .when('/', {
      templateUrl: 'templates/PlayerData.html',
      controller: 'PlayerDataCtrl'
    })
    .when('/notfound', {
      templateUrl: 'templates/404page.html'
    })
    .otherwise({
      redirectTo: '/notfound'
    })

    $locationProvider.html5Mode(true);
  });
