(function _AppMainSettingRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.setting', {
      url: '/setting',
      views: {
        'menuContent@app.main': {
          templateUrl: 'app/main/setting/index.html',
          controller: 'MainSettingController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/setting/controller.js');
        }
      }
    });
  }

  angular.module('app.main.setting').config(route);
}());
