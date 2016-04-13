baseballApp.controller('PlayerDataCtrl',
  function PlayerDataCtrl($scope, playersService) {

    $scope.options = {
      chart: {
        type: 'scatterChart',
        height: 450,
        color: d3.scale.category10().range(),
        scatter: {
          onlyCircles: true
        },
        showLegend: false,
        showDistX: true,
        showDistY: true,
        duration: 350,

        xAxis: {
          axisLabel: 'Hit Count',
          tickFormat: function(d) {
            return d3.format('.02f')(d);
          }
        },
        yAxis: {
          axisLabel: 'Balls Faced',
          tickFormat: function(d) {
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -5
        }
      }
    };

    $scope.data = generateData();


    /* Random Data Generator (took from nvd3.org) */
    function generateData() {
      var playerData = [];

      playersService.getPlayers(function(data) {

        data.forEach(function(currentPlayer, index, array) {

          var name = currentPlayer.playername;
          var ballCount = 0,
            hitCount = 0,
            inningCount = 0,
            games = 0;
          currentPlayer.gamestats.forEach(function(currentGame, index, array) {

            ballCount += currentGame.ballsfaced;
            hitCount += currentGame.hitcount;
            inningCount += currentGame.innings;
            games++;
          });

          playerData.push({
            key: name,
            values: [{
              x: (ballCount / games),
              y: (hitCount / games)
            }]
          });
        });
      });

      return playerData;
    };

  })
