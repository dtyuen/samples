(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name myApp.directive:slider
  * @description
  * # slider
  * Directive of the myApp
  */
  angular.module('mySlider', ['vr.directives.slider'])
  .directive('mySlider', function() {
    return {
      //require: ['ngModel'],
      scope: {
        sliderValue: "=",
        sliderDefaultTxt: "=",
        sliderTextArr: "=",
        disableSlider: "=",
        initState: "=?",
        id: '=?'
      },
      // controller: function($scope, $http) {
      //
      // },
      restrict: 'EA',
      replace: false,
      templateUrl: 'views/templates/slider-template.html',
      link: function(scope, elem, attrs) {

        scope.$watch('sliderTextArr', function() {
          if (scope.sliderTextArr !== undefined) {
            scope.sliderLength = scope.sliderTextArr.length - 1;

            scope.translate = function(v) {
              if( !isNaN(v) ) {
                return scope.sliderTextArr[Math.floor(v)];
              }
            };
          }
        });

        scope.initState = true;

        scope.initSlider = function () {
          scope.initState = false;
        };

        scope.$on('$destroy', function(){
          console.log('slider ' + scope.id + ' destroyed');
        });

      }
    };
  });

})();