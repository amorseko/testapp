(function _AppAuthActivateRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.auth.activate', {
      url: '/activate',
      views: {
        'menuContent@app.auth': {
          templateUrl: 'app/auth/activate/index.html',
          controller: 'AuthActivateController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/auth/activate/controller.js');
        }
      }
    });
  }

  angular.module('app.auth.activate').config(route);
}());
