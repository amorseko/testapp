(function _AppProvidersModule_() {
  'use strict';

  var modules = [
    'app.providers.analytic',
    'app.providers.auth',
    'app.providers.cdn',
    'app.providers.datepicker',
    'app.providers.geolocation',
    'app.providers.graphql',
    'app.providers.html-unsafe',
    'app.providers.image-fallback',
    'app.providers.image-upload',
    'app.providers.myadmedika',
    'app.providers.myhealth',
    'app.providers.mymerchant',
    'app.providers.mypay',
    'app.providers.phone-call',
    'app.providers.string',
    'app.providers.toast'
  ];

  /**
   * @ngdoc overview
   * @name app.providers
   *
   * @description
   * Providers module.
   *
   * ### Modules
   * - {@link app.providers.analytic}
   * - {@link app.providers.auth}
   * - {@link app.providers.cdn}
   * - {@link app.providers.datepicker}
   * - {@link app.providers.geolocation}
   * - {@link app.providers.graphql}
   * - {@link app.providers.html-unsafe}
   * - {@link app.providers.image-fallback}
   * - {@link app.providers.image-upload}
   * - {@link app.providers.myadmedika}
   * - {@link app.providers.myhealth}
   * - {@link app.providers.mymerchant}
   * - {@link app.providers.mypay}
   * - {@link app.providers.phone-call}
   * - {@link app.providers.string}
   * - {@link app.providers.toast}
   */
  angular.module('app.providers', modules);
}());
