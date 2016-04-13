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
        showDistX: true,
        showDistY: true,
        //tooltipContent: function(d) {
        //    return d.series && '<h3>' + d.series[0].key + '</h3>';
        //},
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
        },
        zoom: {
          //NOTE: All attributes below are optional
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: false,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    };

    $scope.data = generateData();

    /* Random Data Generator (took from nvd3.org) */
    function generateData() {
      var playerData = [];

      playersService.getPlayers(function(data) {
        console.log(data);
        data.forEach(function(currentPlayer, index, array) {
          var player = {
            name: currentPlayer.playername,
            aveStats: {
              ballsfaced: 0,
              hitcount: 0,
              innings: 0,
              games: 0
            }
          };
          currentPlayer.gamestats.forEach(function(currentGame, index, array) {
            player.aveStats.ballsfaced += currentGame.ballsfaced;
            player.aveStats.hitcount += currentGame.hitcount;
            player.aveStats.innings += currentGame.innings;
            player.aveStats.games++;
          });

          playerData.push({
            key: player.playername,
            values: [{
              x: (player.aveStats.ballsfaced / player.aveStats.games),
              y: (player.aveStats.hitcount / player.aveStats.games),
              size: (player.aveStats.innings / player.aveStats.games)
            }]
          });
        });
      });
      return playerData;
    };

  })
