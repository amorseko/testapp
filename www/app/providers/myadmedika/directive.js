(function _AppProvidersMyAdMedikaDirective_() {
  'use strict';

  /**
   * @ngdoc directive
   * @name app.providers.myadmedika.directive:myadmedika
   * @restrict A
   *
   * @description
   * MyAdMedika directive.
   */
  function myAdMedika(myadmedika) {
    return {
      restict: 'A',
      link: function link(scope, element, attrs) {
        element.on('click', function click(event) {
          event.preventDefault();
          myadmedika.open(attrs.myadmedika);
        });
      }
    };
  }

  /**
   * @ngdoc directive
   * @name app.providers.myadmedika.directive:myadmedika-check
   * @restrict A
   *
   * @description
   * MyAdMedika directive.
   */
  function myAdMedikaCheck(myadmedika) {
    return {
      restict: 'A',
      link: function link(scope, element) {
        element.on('click', function click(event) {
          event.preventDefault();
          myadmedika.check();
        });
      }
    };
  }

  angular
    .module('app.providers.myadmedika')
      .directive('myadmedika', myAdMedika)
      .directive('myadmedikaCheck', myAdMedikaCheck);
}());
