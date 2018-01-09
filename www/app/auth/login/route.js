(function _AppAuthLoginRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.auth.login', {
      url: '/login',
      views: {
        'menuContent@app.auth': {
          templateUrl: 'app/auth/login/index.html',
          controller: 'AuthLoginController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/auth/login/controller.js');
        }
      }
    });
  }

  angular.module('app.auth.login').config(route);
}());
