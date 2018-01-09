(function _AppProvidersMyHealthDirective_() {
  'use strict';

  /**
   * @ngdoc directive
   * @name app.providers.myhealth.directive:myhealth
   * @restrict A
   *
   * @description
   * MyHealth directive.
   */
  function myHealth(myhealth) {
    return {
      restict: 'A',
      link: function link(scope, element) {
        element.on('click', function click(event) {
          event.preventDefault();
          myhealth.open();
        });
      }
    };
  }

  angular
    .module('app.providers.myhealth')
      .directive('myhealth', myHealth);
}());
