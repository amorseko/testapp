(function _AppProvidersMyMerchantFactory_() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.providers.mymerchant.factory:mymerchant
   *
   * @requires app.providers.toast
   *
   * @description
   * MyMerchant factory.
   */
  function mymerchant(toast) {
    function open() {
      toast.longCenter('coming soon');
    }

    return {
      open: open
    };
  }

  angular
    .module('app.providers.mymerchant')
      .factory('mymerchant', mymerchant);
}());
