(function _AppAuthModule_() {
  'use strict';

  var modules = [
    'app.auth.activate',
    'app.auth.forget-password',
    'app.auth.forget-password-success',
    'app.auth.login',
    'app.auth.register'
  ];

  /**
   * @ngdoc overview
   * @name app.auth
   *
   * @description
   * Auth module.
   *
   * ### Route
   * - `/auth`
   *
   * ### Modules
   * - {@link app.auth.activate}
   * - {@link app.auth.forget-password}
   * - {@link app.auth.forget-password-success}
   * - {@link app.auth.login}
   * - {@link app.auth.register}
   */
  angular.module('app.auth', modules);
}());
