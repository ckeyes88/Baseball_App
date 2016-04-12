baseballApp.directive('datepicker', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      element.datepicker({
        dateFormat: 'yy/mm/dd',
        onSelect: function(date) {
          scope.player.gamestats.dateplayed = date;
          scope.$apply();
        }
      })
    }
  }
});
