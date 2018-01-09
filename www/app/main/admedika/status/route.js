(function _AppMainAdmedikaStatusRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.admedika.status', {
      url: '/status',
      views: {
        'menuContent@app.main.admedika': {
          templateUrl: 'app/main/admedika/status/index.html',
          controller: 'MainAdmedikaStatusController',
          controllerAs: 'admedika'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/admedika/status/controller.js');
        }
      }
    });
  }

  angular.module('app.main.admedika.status').config(route);
}());
