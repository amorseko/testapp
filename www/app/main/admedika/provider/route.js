(function _AppMainAdmedikaProviderRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.admedika.provider', {
      url: '/provider',
      views: {
        'menuContent@app.main.admedika': {
          templateUrl: 'app/main/admedika/provider/index.html',
          controller: 'MainAdmedikaProviderController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/admedika/provider/controller.js');
        }
      }
    });
  }

  angular.module('app.main.admedika.provider').config(route);
}());
