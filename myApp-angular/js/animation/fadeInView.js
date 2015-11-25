/* globals TweenLite */
(function () {
  'use strict';

  angular.module('myApp')
    .animation('.fade-in-view', fadeInView);

  fadeInView.$inject = [];

  function fadeInView() {
    return {
      enter: function(element, done){
        TweenLite
          .from(element, 0.9, {opacity: 0, onComplete: done});
      },
      leave: function(element, done){
        TweenLite
          .to(element, 0.1, {opacity: 0, onComplete: done});
      }
    };
  }
})();
