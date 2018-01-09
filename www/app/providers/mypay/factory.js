(function _AppProvidersMyPayFactory_() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.providers.mypay.factory:mypay
   *
   * @requires app.providers.toast
   *
   * @description
   * MyPay factory.
   */
  function mypay(toast) {
    function open() {
      // toast.longBottom('coming soon');
      toast.longCenter('coming soon');
    }

    return {
      open: open
    };
  }

  angular
    .module('app.providers.mypay')
      .factory('mypay', mypay);
}());
