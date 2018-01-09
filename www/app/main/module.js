(function _AppMainModule_() {
  'use strict';

  var modules = [
    'app.main.admedika',
    'app.main.home',
    'app.main.profile',
    'app.main.setting',
    'app.main.support'
  ];

  /**
   * @ngdoc overview
   * @name app.main
   *
   * @description
   * Main module.
   *
   * ### Route
   * - `/`
   *
   * ### Controller
   * - {@link app.main.controller:MainController}
   *
   * ### Modules
   * - {@link app.main.admedika}
   * - {@link app.main.home}
   * - {@link app.main.profile}
   * - {@link app.main.setting}
   * - {@link app.main.support}
   */
  angular.module('app.main', modules);
}());
