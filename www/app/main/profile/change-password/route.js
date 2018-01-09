(function _AppMainChangePasswordRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.profile.change-password', {
      url: '/change-password',
      views: {
        'menuContent@app.main.profile': {
          templateUrl: 'app/main/profile/change-password/index.html',
          controller: 'MainProfileChangePasswordController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/profile/change-password/controller.js');
        }
      }
    });
  }

  angular.module('app.main.profile.change-password').config(route);
}());
