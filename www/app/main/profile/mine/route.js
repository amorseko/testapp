(function _AppMainProfileMineRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.profile.mine', {
      url: '/mine',
      views: {
        'menuContent@app.main.profile': {
          templateUrl: 'app/main/profile/mine/index.html',
          controller: 'MainProfileMineController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/profile/mine/controller.js');
        }
      }
    });
  }

  angular.module('app.main.profile.mine').config(route);
}());
