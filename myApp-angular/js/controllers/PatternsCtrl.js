(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name myApp.controller:PatternsCtrl
   * @description
   * # PatternsCtrl
   * Controller of the myApp
   */
  angular.module('myApp')
    .controller('PatternsCtrl', PatternsCtrl);

  PatternsCtrl.$inject = ['$scope', '$rootScope', '$location', '$log'];

  function PatternsCtrl($scope, $rootScope, $location, $log) {
    $rootScope.bodyClass = $location.path().substr(1);

    // Single-Select
    $scope.singleSelectArr1 = [
      {type: 'image', selected: false, txt: 'House', imgpath: 'img/suburban.jpg'},
      {type: 'image', selected: false, txt: 'House', imgpath: 'img/suburban.jpg'},
      {type: 'image', selected: false, txt: 'House', imgpath: 'img/suburban.jpg'}
    ];

    $scope.singleSelectArr2 = [
      {type: 'icon', selected: false, txt: 'Icon', imgpath: 'img/weight-loss.png'},
      {type: 'icon', selected: false, txt: 'Icon', imgpath: 'img/weight-loss.png'},
      {type: 'icon', selected: false, txt: 'Icon', imgpath: 'img/weight-loss.png'}
    ];

    // Slider
    $scope.sliderValue1 = 0;
    $scope.sliderDefaultTxt1 = 'Use the slider to indicate your level.';
    $scope.sliderTextArr1 = [
      '0. Low: text here',
      '1. Some',
      '2. Almost: text goes here.',
      '3. Average: long text here. long text here.',
      '4. Medium',
      '5. High: long text here.',
      '6. Expert: placeholder text.',
      '7. Extreme: some text.'
    ];

    $scope.sliderValue2 = 0;
    $scope.sliderDefaultTxt2 = 'Use the slider.';
    $scope.sliderTextArr2 = [
      '0. Low: text here',
      '1. Low: long text here. long text here.',
      '2. Low',
      '3. Normal: some text.',
      '4. High',
      '5. High: long text here.'
    ];
  }
})();
