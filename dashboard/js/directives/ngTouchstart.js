(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name usanaThaProtoApp.directive:ngTouchstart
  * @description
  * # ngTouchstart
  * Directive to handle 'mousedown' and 'touchstart' events for mobile
  * https://github.com/nglar/ngTouchstart
  *
  * customized lines: 17, 20, 22
  */
  angular.module('ngTouchstart', []).directive('ngTouchstart', function () {
    return {
      controller: function ($scope, $element) {
        $element.bind('touchstart mousedown', onTouchStart);

        function onTouchStart() {
          var method = $element.attr('ng-touchstart');
          $scope.$apply(function () {
            $scope.$eval(method);
          });
        }
      }
    };
  });
})();
