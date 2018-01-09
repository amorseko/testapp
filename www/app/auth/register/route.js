(function _AppAuthRegisterRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.auth.register', {
      url: '/register?name&birthday&gender&phone&email&cardNumber&password&passwordConfirmation',
      views: {
        'menuContent@app.auth': {
          templateUrl: 'app/auth/register/index.html',
          controller: 'AuthRegisterController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/auth/register/controller.js');
        }
      }
    });
  }

  angular.module('app.auth.register').config(route);
}());
