(function _AppMainHomeRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.home', {
      url: '/',
      views: {
        'menuContent@app.main': {
          templateUrl: 'app/main/home/index.html',
          controller: 'MainHomeController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/home/controller.js');
        }
      }
    });
  }

  angular.module('app.main.home').config(route);
}());
