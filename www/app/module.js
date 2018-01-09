(function _AppModule_() {
  'use strict';

  var modules = [
    'ngCordova',
    'ionic',
    'oc.lazyLoad',
    'app.providers',
    'app.auth',
    'app.main',
    'ngRaven'
  ];

  /**
   * @ngdoc overview
   * @name app
   *
   * @description
   * App module.
   *
   * ### Route
   * - `/`
   *
   * ### Dependencies
   * - {@link https://github.com/driftyco/ng-cordova ngCordova}
   * - {@link https://github.com/driftyco/ionic ionic}
   * - {@link https://github.com/ocombe/ocLazyLoad oc.lazyLoad}
   *
   * ### Modules
   * - {@link app.auth}
   * - {@link app.main}
   * - {@link app.providers}
   */
  angular.module('app', modules);
}());
