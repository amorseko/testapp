(function _AppProviderToastFactory_() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.providers.toast.factory:toast
   *
   * @requires $cordovaToast
   * @requires $log
   *
   * @description
   * Toast factory.
   */
  function toast($cordovaToast, $log) {
    /**
     * @ngdoc method
     * @name app.providers.toast.factory#longBottom
     * @methodOf app.providers.toast.factory:toast
     *
     * @description
     * Show toast on bottom with long time.
     *
     * @param {string} message Message to be displayed.
     */
    function longBottom(message) {
      try {
        $cordovaToast.showLongBottom(message);
      } catch (e) {
        $log.info(message);
      }
    }

    /**
     * @ngdoc method
     * @name app.providers.toast.factory#longCenter
     * @methodOf app.providers.toast.factory:toast
     *
     * @description
     * Show toast on center with long time.
     *
     * @param {string} message Message to be displayed.
     */
    function longCenter(message) {
      try {
        // console.log($cordovaToast)
        $cordovaToast.showLongCenter(message);
        // $log.info(message);
      } catch (e) {
        $log.info(message);
      }
    }

    /**
     * @ngdoc method
     * @name app.providers.toast.factory#shortBottom
     * @methodOf app.providers.toast.factory:toast
     *
     * @description
     * Show toast on bottom with short time.
     *
     * @param {string} message Message to be displayed.
     */
    function shortBottom(message) {
      try {
        $cordovaToast.showShortBottom(message);
      } catch (e) {
        $log.info(message);
      }
    }

    return {
      longBottom: longBottom,
      longCenter: longCenter,
      shortBottom: shortBottom
    };
  }

  angular.module('app.providers.toast').factory('toast', toast);
}());
