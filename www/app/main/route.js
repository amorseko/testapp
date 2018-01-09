(function _AppMainRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main', {
      abstract: true,
      cache: false,
      views: {
        'content@app': {
          templateUrl: 'app/main/index.html',
          controller: 'MainController',
          controllerAs: '$'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/controller.js');
        }
      }
    });
  }

  angular.module('app.main').config(route);
}());
