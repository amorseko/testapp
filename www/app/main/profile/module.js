(function _AppMainProfileModule_() {
  'use strict';

  var modules = [
    'app.main.profile.change-password',
    'app.main.profile.mine'
  ];

  /**
   * @ngdoc overview
   * @name app.main.profile
   *
   * @description
   * Profile module
   *
   * ### Route
   * `/profile`
   *
   * ### Modules
   * - {@link app.main.profile.change-password}
   * - {@link app.main.profile.mine}
   */
  angular.module('app.main.profile', modules);
}());
