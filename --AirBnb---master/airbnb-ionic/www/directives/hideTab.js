var module = angular.module('airbnb.directives', []);
module.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = true;
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});

module.directive('starRating', function () {
  return {
    restrict: 'A',
    template: '<ul class="rating">' +
    '<li ng-repeat="star in stars" ng-class="star">' +
    '\u2605' +
    '</li>' +
    '</ul>',
    scope: {
      ratingValue: '=',
      max: '='
    },
    link: function (scope, elem, attrs) {
      scope.stars = [];
      for (var i = 0; i < scope.max; i++) {
        scope.stars.push({
          filled: i < scope.ratingValue
        });
      }
    }
  }
});
