(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name myApp.directive:singleSelect
  * @description
  * # singleSelect
  * Directive of the myApp
  */
  angular.module('singleSelect', [])
  .directive('singleSelect', function() {
    return {
      //require: ['ngModel'],
      scope: {
        singleSelectArr: '=',
        disableSingleSelect: '='
      },
      // controller: function($scope, $http) {
      //
      // },
      restrict: 'EA',
      replace: false,
      templateUrl: 'views/templates/single-select-template.html',
      link: function(scope) {
        scope.toggleSingleSelect = function(index) {
          if (!scope.disableSingleSelect) {
            var arr = scope.singleSelectArr;
            arr[index].selected = true;
            angular.forEach(arr, function(value, key) {
              if (index !== key) {
                arr[key].selected = false;
              }
            });
          }
        };
      }
    };
  });
})();
