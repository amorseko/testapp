(function _AppProvidersAuthModule_() {
  'use strict';

  var modules = [
    'angular-jwt'
  ];

  /**
   * @ngdoc overview
   * @name app.providers.auth
   *
   * @description
   * Auth module.
   *
   * ### Dependencies
   * - {@link https://github.com/auth0/angular-jwt angular-jwt}
   *
   * ### Provider
   * - {@link app.providers.auth.service:auth}
   */
  angular.module('app.providers.auth', modules);
}());
