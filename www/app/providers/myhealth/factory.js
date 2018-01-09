(function _AppProvidersMyHealthFactory_() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.providers.myhealth.factory:myhealth
   *
   * @requires $q
   * @requires $window
   *
   * @description
   * MyHealth factory.
   */
  function myhealth(toast) {
    function open() {
      toast.longCenter('coming soon');
    }

    return {
      open: open
    };
  }

  angular
    .module('app.providers.myhealth')
      .factory('myhealth', myhealth);
}());
