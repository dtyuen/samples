'use strict';

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 */
angular
  .module('myApp', [
    'ngAnimate',
    //'ngResource',
    'ngTouch',
    'ui.router',
    'ngTouchstart',
    'singleSelect',
    'mySlider'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'views/slider.html',
        controller: 'PatternsCtrl'
      })
      .state('single-select', {
        url: '/single-select',
        templateUrl: 'views/single-select.html',
        controller: 'PatternsCtrl'
      });
  });
