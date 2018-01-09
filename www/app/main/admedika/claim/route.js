(function _AppMainAdmedikaClaimRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.admedika.claim', {
      url: '/claim',
      views: {
        'menuContent@app.main.admedika': {
          templateUrl: 'app/main/admedika/claim/index.html',
          controller: 'MainAdmedikaClaimController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/admedika/claim/controller.js');
        }
      }
    });
  }

  angular.module('app.main.admedika.claim').config(route);
}());
