(function _AppProvidersMyPayDirective_() {
  'use strict';

  /**
   * @ngdoc directive
   * @name app.providers.mypay.directive:mypay
   * @restrict A
   *
   * @description
   * MyPay directive.
   */
  function myPay(mypay) {
    return {
      restict: 'A',
      link: function link(scope, element) {
        element.on('click', function click(event) {
          event.preventDefault();
          mypay.open();
        });
      }
    };
  }

  angular
    .module('app.providers.mypay')
      .directive('mypay', myPay);
}());
