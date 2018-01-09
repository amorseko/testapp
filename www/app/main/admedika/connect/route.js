(function _AppMainAdmedikaConnectRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.admedika.connect', {
      url: '/connect',
      views: {
        'menuContent@app.main.admedika': {
          templateUrl: 'app/main/admedika/connect/index.html',
          controller: 'MainAdmedikaConnectController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/admedika/connect/controller.js');
        }
      }
    });
  }

  angular.module('app.main.admedika.connect').config(route);
}());
