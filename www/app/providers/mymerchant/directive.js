(function _AppProvidersMyMerchantDirective_() {
  'use strict';

  /**
   * @ngdoc directive
   * @name app.providers.mymerchant.directive:mymerchant
   * @restrict A
   *
   * @description
   * MyMerchant directive.
   */
  function myMerchant(mymerchant) {
    return {
      restict: 'A',
      link: function link(scope, element) {
        element.on('click', function click(event) {
          event.preventDefault();
          mymerchant.open();
        });
      }
    };
  }

  angular
    .module('app.providers.mymerchant')
      .directive('mymerchant', myMerchant);
}());
