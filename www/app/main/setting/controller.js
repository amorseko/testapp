(function _AppMainSettingController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.setting.controller:MainSettingController
   *
   * @requires $cordovaAppVersion
   * @requires $q
   * @requires $window
   * @requires app.providers.graphql.service:graphql
   *
   * @description
   * Setting controller.
   */
  function MainSettingController($cordovaAppVersion, $q, $window) {
    var vm = this;

    vm.app = {};

    $window.document.addEventListener('deviceready', function ready() {
      $q.all([
        $cordovaAppVersion.getAppName(),
        $cordovaAppVersion.getVersionNumber()
      ])
      .then(function resolve(res) {
        angular.merge(vm.app, { name: res[0], version: res[1] });
      });
    }, false);
  }

  angular.module('app.main.setting').controller('MainSettingController', MainSettingController);
}());
